import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthorModel } from '../../../../core/authors/models/author.model';
import { ImageDisplayerComponent } from '../../../../shared/ui/image-displayer/image-displayer.component';

@Component({
  selector: 'app-author-display',
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageDisplayerComponent],
  templateUrl: './author-display.component.html',
})
export class AuthorDisplayComponent {
  @Input({ required: true }) author!: AuthorModel;
  @Input() customPhotoUrl: string | null = null;

  protected getAuthorPhotoUrl(photoId?: number): string | null {
    if (this.customPhotoUrl?.trim()) {
      return this.customPhotoUrl.trim();
    }

    return photoId ? `https://covers.openlibrary.org/a/id/${photoId}-M.jpg` : null;
  }
}
