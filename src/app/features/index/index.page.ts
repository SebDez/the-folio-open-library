import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthStore } from '../../core/auth/auth.store';
import { BookStore } from '../../core/books/book.store';
import { BooksEmptyDisplayComponent } from './components/books-empty-display/books-empty-display.component';
import { BooksPaginationComponent } from './components/books-pagination/books-pagination.component';
import { BooksResultsGridComponent } from './components/books-results-grid/books-results-grid.component';
import { BooksSearchBarComponent } from './components/books-search-bar/books-search-bar.component';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    BooksSearchBarComponent,
    BooksResultsGridComponent,
    BooksEmptyDisplayComponent,
    BooksPaginationComponent,
  ],
  templateUrl: './index.page.html',
})
export class IndexPage {
  protected readonly searchInput = signal<string>('');

  constructor(
    protected readonly authStore: AuthStore,
    protected readonly bookStore: BookStore,
  ) {}

  protected readonly userName = computed<string>(() => this.authStore.user()?.name ?? '');
  protected readonly homeTitleParams = computed<{ name: string }>(() => ({
    name: this.userName(),
  }));

  protected searchBooks(): void {
    this.bookStore.searchByTitle(this.searchInput());
  }

  protected goToPage(pageNumber: number): void {
    this.bookStore.goToPage(pageNumber);
  }
}
