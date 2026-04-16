import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export const AUTH_PROVIDER = new InjectionToken<AuthProvider>('AuthProvider');

export abstract class AuthProvider {
  abstract login(email: string, password: string): Observable<UserModel>;
  abstract logout(): Observable<void>;
}
