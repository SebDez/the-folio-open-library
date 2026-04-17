import { computed, DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, switchMap } from 'rxjs';
import { BookModel } from './models/book.model';
import { BookService } from './services/book.service';

@Injectable({ providedIn: 'root' })
export class BookStore {
  private readonly destroyRef = inject(DestroyRef);
  readonly PAGE_SIZE = 10;

  // Internal state
  private readonly _books = signal<BookModel[]>([]);
  private readonly _total = signal<number>(0);
  private readonly _currentPage = signal<number>(0);
  private readonly _lastQuery = signal<string>('');
  private readonly _lastFetchedQuery = signal<string>('');
  private readonly _lastFetchedPage = signal<number>(-1);
  private readonly _isSearching = signal<boolean>(false);
  private readonly _hasErrorWhileSearching = signal<boolean>(false);
  private readonly _searchRequests$ = new Subject<{ query: string; pageIndex: number }>();

  // Selectors
  readonly books = this._books.asReadonly();
  readonly totalResults = this._total.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly lastQuery = this._lastQuery.asReadonly();
  readonly isSearching = this._isSearching.asReadonly();
  readonly hasErrorWhileSearching = this._hasErrorWhileSearching.asReadonly();
  readonly totalPages = computed<number>(() => {
    const total = this._total();
    if (total <= 0) return 0;
    return Math.ceil(total / this.PAGE_SIZE);
  });
  readonly hasNextPage = computed<boolean>(() => {
    const nextOffset = (this._currentPage() + 1) * this.PAGE_SIZE;
    return nextOffset < this._total();
  });
  readonly hasPreviousPage = computed<boolean>(() => this._currentPage() > 0);

  constructor(private readonly bookService: BookService) {
    this._searchRequests$
      .pipe(
        switchMap(({ query, pageIndex }) =>
          this.bookService
            .searchByTitle({
              title: query,
              take: this.PAGE_SIZE,
              skip: pageIndex * this.PAGE_SIZE,
            })
            .pipe(
              map((result) => ({ kind: 'success' as const, result, query, pageIndex })),
              catchError(() => of({ kind: 'error' as const })),
            ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this._isSearching.set(false);
        if (event.kind === 'error') {
          this._hasErrorWhileSearching.set(true);
          return;
        }

        this._books.set(event.result.books);
        this._total.set(event.result.total);
        this._currentPage.set(event.pageIndex);
        this._lastFetchedQuery.set(event.query);
        this._lastFetchedPage.set(event.pageIndex);
      });
  }

  searchByTitle(title: string): void {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      this._books.set([]);
      this._total.set(0);
      this._currentPage.set(0);
      this._lastQuery.set('');
      this._lastFetchedQuery.set('');
      this._lastFetchedPage.set(-1);
      this._hasErrorWhileSearching.set(false);
      return;
    }

    this._lastQuery.set(trimmedTitle);
    this._fetchPage(0);
  }

  goToNextPage(): void {
    if (!this.hasNextPage() || this._isSearching()) return;
    this._fetchPage(this._currentPage() + 1);
  }

  goToPreviousPage(): void {
    if (!this.hasPreviousPage() || this._isSearching()) return;
    this._fetchPage(this._currentPage() - 1);
  }

  goToPage(pageNumber: number): void {
    if (this._isSearching()) return;
    const totalPages = this.totalPages();
    if (totalPages <= 0) return;
    const targetPage = pageNumber - 1;
    if (targetPage < 0 || targetPage >= totalPages || targetPage === this._currentPage()) return;
    this._fetchPage(targetPage);
  }

  private _fetchPage(pageIndex: number): void {
    const query = this._lastQuery();
    if (!query) return;
    if (
      this._lastFetchedQuery() === query &&
      this._lastFetchedPage() === pageIndex &&
      !this._hasErrorWhileSearching()
    ) {
      return;
    }

    this._isSearching.set(true);
    this._hasErrorWhileSearching.set(false);

    this._searchRequests$.next({ query, pageIndex });
  }
}
