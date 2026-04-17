import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  mapOpenLibraryBookDtoToBookModel,
  OpenLibraryBookDto,
} from '../mappers/open-library-book.mapper';
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
          books: response.docs.map(mapOpenLibraryBookDtoToBookModel),
          total: response.numFound,
          skip: response.start,
          take,
        })),
      );
  }
}
