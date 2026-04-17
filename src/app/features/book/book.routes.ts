import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./book.page').then((m) => m.BookPage),
  },
];
