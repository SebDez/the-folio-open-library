import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BookModel } from '../../core/books/models/book.model';
import { FavoriteStore } from '../../core/favorites/favorite.store';
import { BooksEmptyDisplayComponent } from '../index/components/books-empty-display/books-empty-display.component';
import { BooksResultsGridComponent } from '../index/components/books-results-grid/books-results-grid.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, BooksResultsGridComponent, BooksEmptyDisplayComponent],
  templateUrl: './favorites.page.html',
})
export class FavoritesPage {
  constructor(protected readonly favoriteStore: FavoriteStore) {}

  protected toggleFavorite(book: BookModel): void {
    this.favoriteStore.toggleFavorite(book);
  }
}
