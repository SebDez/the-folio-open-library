import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';

import { BookDetailsModel } from '../../core/books/models/book.model';
import { BookService } from '../../core/books/services/book.service';
import { FavoriteStore } from '../../core/favorites/favorite.store';
import { BookDetailsContentComponent } from './components/book-details-content/book-details-content.component';
import { BooksEmptyDisplayComponent } from '../index/components/books-empty-display/books-empty-display.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    BookDetailsContentComponent,
    BooksEmptyDisplayComponent,
  ],
  templateUrl: './book.page.html',
})
export class BookPage {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly book = signal<BookDetailsModel | null>(null);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly hasError = signal<boolean>(false);

  protected readonly isFavorite = computed<boolean>(() => {
    const currentBook = this.book();
    return currentBook ? this.favoriteStore.isFavorite(currentBook.id) : false;
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BookService,
    protected readonly favoriteStore: FavoriteStore,
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => (params.get('id') ?? '').trim()),
        filter((bookId) => Boolean(bookId)),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading.set(true);
          this.hasError.set(false);
          this.book.set(null);
        }),
        switchMap((bookId) =>
          this.bookService.getByBookId(bookId).pipe(
            map((book) => ({ kind: 'success' as const, book })),
            catchError(() => of({ kind: 'error' as const })),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.isLoading.set(false);
        if (event.kind === 'error') {
          this.hasError.set(true);
          return;
        }

        this.book.set(event.book);
      });
  }

  protected toggleFavorite(): void {
    const currentBook = this.book();
    if (!currentBook) {
      return;
    }

    this.favoriteStore.toggleFavorite(currentBook);
  }
}
