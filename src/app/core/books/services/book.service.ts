import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BOOK_PROVIDER, BookProvider } from '../providers/book.provider';
import { BookSearchResultModel } from '../models/book-search-result.model';
import { BookSearchPageParams } from '../models/book-search-params.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(@Inject(BOOK_PROVIDER) private readonly bookProvider: BookProvider) {}

  searchByTitle(params: BookSearchPageParams): Observable<BookSearchResultModel> {
    const title = params.title.trim();
    const take = Math.max(1, Math.min(params.take, 50));
    const skip = Math.max(0, params.skip);

    if (!title) {
      return of({
        books: [],
        total: 0,
        skip,
        take,
      });
    }

    return this.bookProvider.searchByTitle({
      title,
      take,
      skip,
    });
  }
}
