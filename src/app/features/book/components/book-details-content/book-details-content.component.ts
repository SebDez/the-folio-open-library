import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BookDetailsModel } from '../../../../core/books/models/book.model';
import { HeartIconComponent } from '../../../../shared/icons/heart-icon.component';
import { BookCoverComponent } from '../../../index/components/book-cover/book-cover.component';

@Component({
  selector: 'app-book-details-content',
  standalone: true,
  imports: [CommonModule, TranslateModule, BookCoverComponent, HeartIconComponent],
  templateUrl: './book-details-content.component.html',
})
export class BookDetailsContentComponent {
  @Input({ required: true }) book!: BookDetailsModel;
  @Input({ required: true }) isFavorite = false;
  @Output() favoriteToggled = new EventEmitter<void>();

  protected getBookCoverUrl(coverId?: number): string | null {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }

  protected onFavoriteToggle(): void {
    this.favoriteToggled.emit();
  }
}
