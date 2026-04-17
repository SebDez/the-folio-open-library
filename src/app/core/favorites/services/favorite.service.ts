import { Inject, Injectable } from '@angular/core';

import { BookModel } from '../../books/models/book.model';
import { FAVORITE_PROVIDER, FavoriteProvider } from '../providers/favorite.provider';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(
    @Inject(FAVORITE_PROVIDER) private readonly favoriteProvider: FavoriteProvider,
  ) {}

  getAll(): BookModel[] {
    return this.favoriteProvider.getAll();
  }

  saveAll(favorites: BookModel[]): void {
    this.favoriteProvider.saveAll(favorites);
  }
}
