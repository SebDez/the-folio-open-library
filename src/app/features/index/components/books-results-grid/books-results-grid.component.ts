import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BookModel } from '../../../../core/books/models/book.model';
import { HeartIconComponent } from '../../../../shared/icons/heart-icon.component';
import { ImageDisplayerComponent } from '../../../../shared/ui/image-displayer/image-displayer.component';

@Component({
  selector: 'app-books-results-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HeartIconComponent, ImageDisplayerComponent],
  templateUrl: './books-results-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksResultsGridComponent {
  @Input({ required: true }) books: BookModel[] = [];
  @Input() favoriteIds: Set<string> = new Set<string>();
  @Output() favoriteToggled = new EventEmitter<BookModel>();

  protected getBookCoverUrl(coverId?: number): string | null {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }

  protected getBookRoute(bookId: string): string[] {
    return ['/book', bookId];
  }

  protected getAuthorRoute(authorId: string): string[] {
    return ['/author', authorId];
  }

  protected getBookAuthorId(book: BookModel, index: number): string | null {
    return book.authorIds?.[index] ?? null;
  }

  protected toggleFavorite(book: BookModel): void {
    this.favoriteToggled.emit(book);
  }

  protected isFavorite(bookId: string): boolean {
    return this.favoriteIds.has(bookId);
  }

  protected getFavoriteAriaLabel(book: BookModel): string {
    return this.isFavorite(book.id)
      ? 'index.grid.favoriteRemoveAria'
      : 'index.grid.favoriteAddAria';
  }
}
