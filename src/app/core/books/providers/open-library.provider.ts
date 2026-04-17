import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { BookSearchResultModel } from '../models/book-search-result.model';
import { BookSearchPageParams } from '../models/book-search-params.model';
import { BookProvider } from './book.provider';
import { BookModel } from '../models/book.model';

interface OpenLibraryBook {
  key?: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryBook[];
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
          books: response.docs.map((doc) => this.mapToBookModel(doc)),
          total: response.numFound,
          skip: response.start,
          take,
        })),
      );
  }

  private mapToBookModel(doc: OpenLibraryBook): BookModel {
    return {
      id: doc.key ?? '',
      title: doc.title,
      authors: doc.author_name ?? [],
      coverId: doc.cover_i,
      publishYear: doc.first_publish_year,
    };
  }
}
