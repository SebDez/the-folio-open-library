import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/authenticated-layout/authenticated-layout.component').then(
        (m) => m.AuthenticatedLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/index/index.page').then((m) => m.IndexPage),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./features/favorites/favorites.routes').then((m) => m.FAVORITES_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' }
];
