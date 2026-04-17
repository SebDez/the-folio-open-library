import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthProvider } from './auth.provider';
import { UserModel } from '../models/user.model';

const VALID_EMAIL = 'admin@test.com';
const VALID_PASSWORD = 'password';

@Injectable()
export class AuthFakeLocalProvider implements AuthProvider {
  login(email: string, password: string): Observable<UserModel> {
    return new Observable<UserModel>((observer) => {
      setTimeout(() => {
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
          observer.next({
            id: 'user-1',
            name: 'John Doe',
            token: 'fake-jwt-token',
          });
          observer.complete();
          return;
        }

        observer.error(new Error('Invalid credentials'));
      }, 2000);
    });
  }

  logout(): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        observer.complete();
      }, 3000);
    });
  }
}
