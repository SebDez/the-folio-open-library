import { Injectable, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { AuthorModel } from '../../core/authors/models/author.model';
import { AuthorService } from '../../core/authors/services/author.service';

@Injectable({ providedIn: 'root' })
export class AuthorDetailStore {
  private readonly _author = signal<AuthorModel | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _hasError = signal<boolean>(false);

  readonly author = this._author.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  constructor(private readonly authorService: AuthorService) {}

  load(authorId: string) {
    const normalizedAuthorId = authorId.trim();
    if (!normalizedAuthorId) {
      this.reset();
      return of({ kind: 'idle' as const });
    }

    this._isLoading.set(true);
    this._hasError.set(false);
    this._author.set(null);

    return this.authorService.getByAuthorId(normalizedAuthorId).pipe(
      map((author) => ({ kind: 'success' as const, author })),
      catchError(() => of({ kind: 'error' as const })),
      map((event) => {
        this._isLoading.set(false);
        if (event.kind === 'error') {
          this._hasError.set(true);
          return event;
        }

        this._author.set(event.author);
        return event;
      }),
    );
  }

  reset(): void {
    this._author.set(null);
    this._isLoading.set(false);
    this._hasError.set(false);
  }
}
