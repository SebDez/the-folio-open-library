import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { BookDetailsContentComponent } from './components/book-details-content/book-details-content.component';
import { BooksEmptyDisplayComponent } from '../index/components/books-empty-display/books-empty-display.component';
import { BookDetailStore } from './book-detail.store';

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
  private readonly store = inject(BookDetailStore);
  protected readonly book = this.store.book;
  protected readonly authors = this.store.authors;
  protected readonly isLoading = this.store.isLoading;
  protected readonly hasError = this.store.hasError;
  protected readonly isFavorite = this.store.isFavorite;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => (params.get('id') ?? '').trim()),
        filter((bookId) => Boolean(bookId)),
        distinctUntilChanged(),
        switchMap((bookId) => this.store.load(bookId)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected toggleFavorite(): void {
    this.store.toggleFavorite();
  }
}
