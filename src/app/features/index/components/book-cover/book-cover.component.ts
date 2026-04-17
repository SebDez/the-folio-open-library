import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BookIconComponent } from '../../../../shared/icons/book-icon.component';

@Component({
  selector: 'app-book-cover',
  standalone: true,
  imports: [CommonModule, TranslateModule, BookIconComponent],
  templateUrl: './book-cover.component.html',
})
export class BookCoverComponent {
  @Input() src: string | null = null;
  @Input() alt = 'Book cover';

  protected isImageLoading = false;
  protected hasImageError = false;
  protected imageLoaded = false;

  protected onImageLoadStart(): void {
    this.isImageLoading = true;
    this.hasImageError = false;
    this.imageLoaded = false;
  }

  protected onImageLoad(): void {
    this.isImageLoading = false;
    this.hasImageError = false;
    this.imageLoaded = true;
  }

  protected onImageError(): void {
    this.isImageLoading = false;
    this.hasImageError = true;
    this.imageLoaded = false;
  }
}
