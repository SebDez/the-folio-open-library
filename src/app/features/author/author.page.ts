import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';

import { AuthorModel } from '../../core/authors/models/author.model';
import { AuthorService } from '../../core/authors/services/author.service';
import { AuthorDisplayComponent } from './components/author-display/author-display.component';
import { BooksEmptyDisplayComponent } from '../index/components/books-empty-display/books-empty-display.component';

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    AuthorDisplayComponent,
    BooksEmptyDisplayComponent,
  ],
  templateUrl: './author.page.html',
})
export class AuthorPage {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly author = signal<AuthorModel | null>(null);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly hasError = signal<boolean>(false);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authorService: AuthorService,
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => (params.get('id') ?? '').trim()),
        filter((authorId) => Boolean(authorId)),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading.set(true);
          this.hasError.set(false);
          this.author.set(null);
        }),
        switchMap((authorId) =>
          this.authorService.getByAuthorId(authorId).pipe(
            map((author) => ({ kind: 'success' as const, author })),
            catchError(() => of({ kind: 'error' as const })),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.isLoading.set(false);
        if (event.kind === 'error') {
          this.hasError.set(true);
          return;
        }

        this.author.set(event.author);
      });
  }
}
