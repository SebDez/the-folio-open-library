import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorModel } from '../models/author.model';

export const AUTHOR_PROVIDER = new InjectionToken<AuthorProvider>('AuthorProvider');

export abstract class AuthorProvider {
  abstract getByAuthorId(authorId: string): Observable<AuthorModel>;
}
