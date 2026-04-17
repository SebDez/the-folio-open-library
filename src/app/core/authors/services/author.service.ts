import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

import { AuthorModel } from '../models/author.model';
import { AUTHOR_PROVIDER, AuthorProvider } from '../providers/author.provider';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(@Inject(AUTHOR_PROVIDER) private readonly authorProvider: AuthorProvider) {}

  getByAuthorId(authorId: string): Observable<AuthorModel> {
    return this.authorProvider.getByAuthorId(authorId.trim());
  }

  getByAuthorIds(authorIds: string[]): Observable<AuthorModel[]> {
    const uniqueAuthorIds = Array.from(new Set(authorIds.map((authorId) => authorId.trim()))).filter(
      (authorId) => Boolean(authorId),
    );

    if (!uniqueAuthorIds.length) {
      return of([]);
    }

    return forkJoin(
      uniqueAuthorIds.map((authorId) =>
        this.authorProvider.getByAuthorId(authorId).pipe(catchError(() => of(null))),
      ),
    ).pipe(
      map((authors) => authors.filter((author): author is AuthorModel => author !== null)),
      catchError(() => of([])),
    );
  }
}
