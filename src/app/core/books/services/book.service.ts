import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BOOK_PROVIDER, BookProvider } from '../providers/book.provider';
import { BookSearchResultModel } from '../models/book-search-result.model';
import { BookSearchPageParams } from '../models/book-search-params.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(@Inject(BOOK_PROVIDER) private readonly bookProvider: BookProvider) {}

  searchByTitle(params: BookSearchPageParams): Observable<BookSearchResultModel> {
    return this.bookProvider.searchByTitle(params);
  }
}
