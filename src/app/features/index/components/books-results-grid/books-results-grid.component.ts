import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BookModel } from '../../../../core/books/models/book.model';
import { HeartIconComponent } from '../../../../shared/icons/heart-icon.component';
import { BookCoverComponent } from '../book-cover/book-cover.component';

@Component({
  selector: 'app-books-results-grid',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeartIconComponent, BookCoverComponent],
  templateUrl: './books-results-grid.component.html',
})
export class BooksResultsGridComponent {
  @Input({ required: true }) books: BookModel[] = [];

  protected getBookCoverUrl(coverId?: number): string | null {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }
}
