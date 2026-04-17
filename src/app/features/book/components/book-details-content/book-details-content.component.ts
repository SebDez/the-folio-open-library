import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthorModel } from '../../../../core/authors/models/author.model';
import { BookDetailsModel } from '../../../../core/books/models/book.model';
import { HeartIconComponent } from '../../../../shared/icons/heart-icon.component';
import { ImageDisplayerComponent } from '../../../../shared/ui/image-displayer/image-displayer.component';

@Component({
  selector: 'app-book-details-content',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ImageDisplayerComponent, HeartIconComponent],
  templateUrl: './book-details-content.component.html',
})
export class BookDetailsContentComponent {
  @Input({ required: true }) book!: BookDetailsModel;
  @Input() authors: AuthorModel[] = [];
  @Input({ required: true }) isFavorite = false;
  @Output() favoriteToggled = new EventEmitter<void>();

  protected getBookCoverUrl(coverId?: number): string | null {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }

  protected onFavoriteToggle(): void {
    this.favoriteToggled.emit();
  }

  protected getAuthorRoute(authorId: string): string[] {
    return ['/author', authorId];
  }
}
