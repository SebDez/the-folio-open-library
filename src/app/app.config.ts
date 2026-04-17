import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthFakeLocalProvider } from './core/auth/providers/auth-fake-local.provider';
import { AUTH_PROVIDER } from './core/auth/providers/auth.provider';
import { BOOK_PROVIDER } from './core/books/providers/book.provider';
import { OpenLibraryProvider } from './core/books/providers/open-library.provider';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({ defaultLanguage: 'en' }),
    provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),
    { provide: AUTH_PROVIDER, useClass: AuthFakeLocalProvider },
    { provide: BOOK_PROVIDER, useClass: OpenLibraryProvider },
  ],
};
