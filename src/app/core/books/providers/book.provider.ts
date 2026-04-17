import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { BookDetailsModel } from '../models/book.model';
import { BookSearchResultModel } from '../models/book-search-result.model';
import { BookSearchPageParams } from '../models/book-search-params.model';

export const BOOK_PROVIDER = new InjectionToken<BookProvider>('BookProvider');

export abstract class BookProvider {
  abstract searchByTitle(params: BookSearchPageParams): Observable<BookSearchResultModel>;
  abstract getByBookId(bookId: string): Observable<BookDetailsModel>;
}
