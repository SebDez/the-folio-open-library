import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthorModel } from '../../core/authors/models/author.model';
import { AuthorService } from '../../core/authors/services/author.service';
import { BookDetailsModel } from '../../core/books/models/book.model';
import { BookService } from '../../core/books/services/book.service';
import { FavoriteStore } from '../../core/favorites/favorite.store';

@Injectable({ providedIn: 'root' })
export class BookDetailStore {
  private readonly _book = signal<BookDetailsModel | null>(null);
  private readonly _authors = signal<AuthorModel[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _hasError = signal<boolean>(false);

  readonly book = this._book.asReadonly();
  readonly authors = this._authors.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();
  readonly isFavorite = computed<boolean>(() => {
    const currentBook = this._book();
    return currentBook ? this.favoriteStore.isFavorite(currentBook.id) : false;
  });

  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly favoriteStore: FavoriteStore,
  ) {}

  load(bookId: string) {
    const normalizedBookId = bookId.trim();
    if (!normalizedBookId) {
      this.reset();
      return of({ kind: 'idle' as const });
    }

    this._isLoading.set(true);
    this._hasError.set(false);
    this._book.set(null);
    this._authors.set([]);

    return this.bookService.getByBookId(normalizedBookId).pipe(
      switchMap((book) =>
        this.authorService.getByAuthorIds(book.authorIds ?? []).pipe(
          map((authors) => ({ kind: 'success' as const, book, authors })),
        ),
      ),
      catchError(() => of({ kind: 'error' as const })),
      map((event) => {
        this._isLoading.set(false);
        if (event.kind === 'error') {
          this._hasError.set(true);
          return event;
        }

        this._book.set(event.book);
        this._authors.set(event.authors);
        return event;
      }),
    );
  }

  toggleFavorite(): void {
    const currentBook = this._book();
    if (!currentBook) {
      return;
    }

    this.favoriteStore.toggleFavorite(currentBook);
  }

  reset(): void {
    this._book.set(null);
    this._authors.set([]);
    this._isLoading.set(false);
    this._hasError.set(false);
  }
}
