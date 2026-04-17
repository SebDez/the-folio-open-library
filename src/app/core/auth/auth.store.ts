import { computed, Injectable, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserModel } from './models/user.model';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';
import { BookStore } from '../books/book.store';
import { FavoriteStore } from '../favorites/favorite.store';

const AUTH_USER_STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Internal state
  private readonly _isLoggingIn = signal<boolean>(false);
  private readonly _hasErrorWhileLoggingIn = signal<boolean>(false);
  private readonly _user = signal<UserModel | null>(null);
  private readonly _isLoggingOut = signal<boolean>(false);

  // Selectors
  readonly user = this._user.asReadonly();
  readonly isLoggingIn = this._isLoggingIn.asReadonly();
  readonly hasErrorWhileLoggingIn = this._hasErrorWhileLoggingIn.asReadonly();
  readonly isLoggingOut = this._isLoggingOut.asReadonly();
  readonly isLoggedIn = computed<boolean>(() => {
    const token = this._user()?.token;
    return Boolean(token?.trim());
  });

  // Subjects
  private readonly logoutSubject = new Subject<void>();
  readonly logoutObs$ = this.logoutSubject.asObservable();

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private bookStore: BookStore,
    private favoriteStore: FavoriteStore,
  ) {
    this.initFromStorage();
  }

  // Actions
  login(email: string, password: string): void {
    this._isLoggingIn.set(true);
    this._hasErrorWhileLoggingIn.set(false);
    this.authService.login(email, password).subscribe({
      next: (user) => {
        this._user.set(user);
        this.localStorageService.setItem(AUTH_USER_STORAGE_KEY, user);
        this.favoriteStore.initFromStorage();
        this._hasErrorWhileLoggingIn.set(false);
      },
      error: () => {
        this._isLoggingIn.set(false);
        this._hasErrorWhileLoggingIn.set(true);
      },
      complete: () => {
        this._isLoggingIn.set(false);
      },
    });
  }

  logout(): void {
    this._isLoggingOut.set(true);
    this.authService.logout().subscribe({
      complete: () => {
        this.bookStore.reset();
        this.favoriteStore.reset();
        this._user.set(null);
        this.localStorageService.removeItem(AUTH_USER_STORAGE_KEY);
        this.logoutSubject.next();
        this._isLoggingOut.set(false);
      },
      error: () => {
        this.bookStore.reset();
        this.favoriteStore.reset();
        this._user.set(null);
        this.localStorageService.removeItem(AUTH_USER_STORAGE_KEY);
        this.logoutSubject.next();
        this._isLoggingOut.set(false);
      },
    });
  }

  // Private methods

  private initFromStorage(): void {
    const storedUser = this.localStorageService.getItem<UserModel>(AUTH_USER_STORAGE_KEY);
    if (storedUser && storedUser.token?.trim()) {
      this._user.set(storedUser);
      this.favoriteStore.initFromStorage();
    }
  }
}
