import { Routes } from '@angular/router';

export const AUTHOR_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./author.page').then((m) => m.AuthorPage),
  },
];
