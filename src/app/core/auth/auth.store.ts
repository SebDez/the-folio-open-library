import { computed, Injectable, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserModel } from './models/user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Internal state
  private readonly _loading = signal<boolean>(false);
  private readonly _hasErrorWhileLoggingIn = signal<boolean>(false);
  private readonly _user = signal<UserModel | null>(null);

  // Selectors
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly hasErrorWhileLoggingIn = this._hasErrorWhileLoggingIn.asReadonly();
  readonly isLoggedIn = computed(() => {
    return this._user() !== null && this._user()?.token !== null;
  });

  // Subjects
  private logoutSubject = new Subject<void>();
  logoutObs$ = this.logoutSubject.asObservable();

  constructor(private authService: AuthService) {}

  // Actions
  login(email: string, password: string): void {
    this._loading.set(true);
    this._hasErrorWhileLoggingIn.set(false);
    this.authService.login(email, password).subscribe({
      next: (user) => {
        this._user.set(user);
        this._hasErrorWhileLoggingIn.set(false);
      },
      error: () => {
        this._loading.set(false);
        this._hasErrorWhileLoggingIn.set(true);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this._user.set(null);
        this.logoutSubject.next();
      },
    });
  }
}
