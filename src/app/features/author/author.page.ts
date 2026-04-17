import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { AuthorDisplayComponent } from './components/author-display/author-display.component';
import { BooksEmptyDisplayComponent } from '../index/components/books-empty-display/books-empty-display.component';
import { AuthorDetailStore } from './author-detail.store';

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
  private readonly store = inject(AuthorDetailStore);
  protected readonly author = this.store.author;
  protected readonly isLoading = this.store.isLoading;
  protected readonly hasError = this.store.hasError;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => (params.get('id') ?? '').trim()),
        filter((authorId) => Boolean(authorId)),
        distinctUntilChanged(),
        switchMap((authorId) => this.store.load(authorId)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
