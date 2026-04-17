import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthStore } from '../../core/auth/auth.store';
import { BookStore } from '../../core/books/book.store';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
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
}
