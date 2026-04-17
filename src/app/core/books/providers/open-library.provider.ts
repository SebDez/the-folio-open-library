import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

import {
  mapOpenLibraryBookDtoToBookModel,
  mapOpenLibraryBookDetailDtoToBookDetailsModel,
  OpenLibraryBookDto,
  OpenLibraryBookDetailDto,
} from '../mappers/open-library-book.mapper';
import { BookDetailsModel } from '../models/book.model';
import { BookSearchResultModel } from '../models/book-search-result.model';
import { BookSearchPageParams } from '../models/book-search-params.model';
import { BookProvider } from './book.provider';

interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryBookDto[];
}

@Injectable()
export class OpenLibraryProvider implements BookProvider {
  constructor(private readonly httpClient: HttpClient) {}

  searchByTitle(params: BookSearchPageParams): Observable<BookSearchResultModel> {
    const { title, take, skip } = params;
    return this.httpClient
      .get<OpenLibrarySearchResponse>('https://openlibrary.org/search.json', {
        params: {
          title,
          limit: String(take),
          offset: String(skip),
        },
      })
      .pipe(
        map((response) => ({
          books: response.docs.map((doc) => {
            const mappedBook = mapOpenLibraryBookDtoToBookModel(doc);
            return {
              ...mappedBook,
              id: this.normalizeBookId(mappedBook.id),
              authorIds: mappedBook.authorIds?.map((authorId) => this.normalizeAuthorId(authorId)),
            };
          }),
          total: response.numFound,
          skip: response.start,
          take,
        })),
      );
  }

  getByBookId(bookId: string): Observable<BookDetailsModel> {
    const normalizedBookId = this.normalizeBookId(bookId);
    if (!this.isValidBookId(normalizedBookId)) {
      return throwError(() => new Error('Invalid book id'));
    }

    return this.httpClient
      .get<OpenLibraryBookDetailDto>(
        `https://openlibrary.org/works/${encodeURIComponent(normalizedBookId)}.json`,
      )
      .pipe(
        map((response) =>
          {
            const mappedBook = mapOpenLibraryBookDetailDtoToBookDetailsModel(
              response,
              this.normalizeBookId(response.key ?? normalizedBookId),
            );

            return {
              ...mappedBook,
              authorIds: mappedBook.authorIds?.map((authorId) => this.normalizeAuthorId(authorId)),
            };
          },
        ),
      );
  }

  private normalizeBookId(value: string): string {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return '';
    }

    return trimmedValue.replace(/^\/works\//, '');
  }

  private normalizeAuthorId(value: string): string {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return '';
    }

    return trimmedValue.replace(/^\/authors\//, '');
  }

  private isValidBookId(bookId: string): boolean {
    return /^OL\d+W$/i.test(bookId);
  }
}
