import { Injectable } from '@angular/core';
import { AuthFakeLocalProvider } from '../providers/auth-fake-local.provider';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authProvider: AuthFakeLocalProvider) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.authProvider.login(email, password);
  }

  logout(): Observable<void> {
    return this.authProvider.logout();
  }
}
