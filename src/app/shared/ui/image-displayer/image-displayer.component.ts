import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BookIconComponent } from '../../icons/book-icon.component';

@Component({
  selector: 'app-image-displayer',
  standalone: true,
  imports: [CommonModule, TranslateModule, BookIconComponent],
  templateUrl: './image-displayer.component.html',
})
export class ImageDisplayerComponent {
  @Input() src: string | null = null;
  @Input({ required: true }) alt = '';
  @Input() cursorPointer = true;
  @Input() emptyLabel = 'shared.image.noCover';

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
