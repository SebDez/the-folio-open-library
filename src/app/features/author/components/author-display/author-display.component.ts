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

  protected getAuthorPhotoUrl(photoId?: number): string | null {
    return photoId ? `https://covers.openlibrary.org/a/id/${photoId}-M.jpg` : null;
  }
}
