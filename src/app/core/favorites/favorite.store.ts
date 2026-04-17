import { computed, Injectable, signal } from '@angular/core';

import { BookModel } from '../books/models/book.model';
import { FavoriteService } from './services/favorite.service';

@Injectable({ providedIn: 'root' })
export class FavoriteStore {
  private readonly _favorites = signal<BookModel[]>([]);

  readonly favorites = this._favorites.asReadonly();
  readonly favoriteCount = computed<number>(() => this._favorites().length);
  readonly favoriteIds = computed<Set<string>>(
    () => new Set(this._favorites().map((favorite) => favorite.id)),
  );

  constructor(private readonly favoriteService: FavoriteService) {}

  initFromStorage(): void {
    this._favorites.set(this.favoriteService.getAll());
  }

  toggleFavorite(book: BookModel): void {
    if (this.isFavorite(book.id)) {
      this.removeFavorite(book.id);
      return;
    }

    this.addFavorite(book);
  }

  addFavorite(book: BookModel): void {
    if (!book.id || this.isFavorite(book.id)) {
      return;
    }

    const updatedFavorites = [...this._favorites(), book];
    this._favorites.set(updatedFavorites);
    this.persist(updatedFavorites);
  }

  removeFavorite(bookId: string): void {
    if (!this.isFavorite(bookId)) {
      return;
    }

    const updatedFavorites = this._favorites().filter((favorite) => favorite.id !== bookId);
    this._favorites.set(updatedFavorites);
    this.persist(updatedFavorites);
  }

  isFavorite(bookId: string): boolean {
    return this.favoriteIds().has(bookId);
  }

  reset(): void {
    this._favorites.set([]);
  }

  private persist(favorites: BookModel[]): void {
    this.favoriteService.saveAll(favorites);
  }
}
