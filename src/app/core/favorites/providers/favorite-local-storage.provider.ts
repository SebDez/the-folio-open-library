import { Injectable } from '@angular/core';

import { UserModel } from '../../auth/models/user.model';
import { BookModel } from '../../books/models/book.model';
import { LocalStorageService } from '../../storage/local-storage.service';
import { FavoriteProvider } from './favorite.provider';

const FAVORITES_STORAGE_KEY_PREFIX = 'favorites_books';
const AUTH_USER_STORAGE_KEY = 'auth_user';

@Injectable()
export class FavoriteLocalStorageProvider implements FavoriteProvider {
  constructor(private readonly localStorageService: LocalStorageService) {}

  getAll(): BookModel[] {
    const storageKey = this.getStorageKeyForCurrentUser();
    if (!storageKey) {
      return [];
    }

    const favorites = this.localStorageService.getItem<BookModel[]>(storageKey);
    if (!Array.isArray(favorites)) {
      return [];
    }

    return favorites.filter((book) => Boolean(book?.id));
  }

  saveAll(favorites: BookModel[]): void {
    const storageKey = this.getStorageKeyForCurrentUser();
    if (!storageKey) {
      return;
    }

    this.localStorageService.setItem(storageKey, favorites);
  }

  private getStorageKeyForCurrentUser(): string | null {
    const user = this.localStorageService.getItem<UserModel>(AUTH_USER_STORAGE_KEY);
    const userId = user?.id?.trim();
    if (!userId) {
      return null;
    }

    return `${FAVORITES_STORAGE_KEY_PREFIX}:${userId}`;
  }
}
