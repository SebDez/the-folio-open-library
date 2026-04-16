import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AUTH_PROVIDER, AuthProvider } from '../providers/auth.provider';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(@Inject(AUTH_PROVIDER) private readonly authProvider: AuthProvider) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.authProvider.login(email, password);
  }

  logout(): Observable<void> {
    return this.authProvider.logout();
  }
}
