import { InjectionToken } from '@angular/core';

import { BookModel } from '../../books/models/book.model';

export const FAVORITE_PROVIDER = new InjectionToken<FavoriteProvider>('FavoriteProvider');

export abstract class FavoriteProvider {
  abstract getAll(): BookModel[];
  abstract saveAll(favorites: BookModel[]): void;
}
