import { computed, Injectable, signal } from '@angular/core';
import { BookModel } from './models/book.model';
import { BookService } from './services/book.service';

@Injectable({ providedIn: 'root' })
export class BookStore {
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

  constructor(private readonly bookService: BookService) {}

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

    const offset = pageIndex * this.PAGE_SIZE;
    this.bookService
      .searchByTitle({
        title: query,
        take: this.PAGE_SIZE,
        skip: offset,
      })
      .subscribe({
        next: (result) => {
          this._books.set(result.books);
          this._total.set(result.total);
          this._currentPage.set(pageIndex);
          this._lastFetchedQuery.set(query);
          this._lastFetchedPage.set(pageIndex);
        },
        error: () => {
          this._isSearching.set(false);
          this._hasErrorWhileSearching.set(true);
        },
        complete: () => {
          this._isSearching.set(false);
        },
      });
  }
}
