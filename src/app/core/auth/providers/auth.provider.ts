import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export abstract class AuthProvider {
  abstract login(email: string, password: string): Observable<UserModel>;
  abstract logout(): Observable<void>;
}
