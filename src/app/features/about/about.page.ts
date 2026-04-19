import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthorModel } from '../../core/authors/models/author.model';
import { AuthorDisplayComponent } from '../author/components/author-display/author-display.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AuthorDisplayComponent, TranslateModule],
  templateUrl: './about.page.html',
})
export class AboutPage {
  readonly currentAuthor = signal<AuthorModel>({
    id: 'about-bio',
    name: 'about.name',
    birthDate: '1991-07-25',
    bio: 'about.bio',
  });

  protected readonly photoUrl =
    'https://media.licdn.com/dms/image/v2/D4D03AQGmGyS_3Cq90g/profile-displayphoto-crop_800_800/B4DZ1KLPzyHgAI-/0/1775065961341?e=1778112000&v=beta&t=E926P2Cl3MIofnKFut9-oTJ596Zt_m4BWSrZnrfbx_g';

  constructor(private readonly translate: TranslateService) {
    this.updateCurrentAuthor();
    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.updateCurrentAuthor();
    });
  }

  private updateCurrentAuthor(): void {
    this.currentAuthor.set({
      id: 'about-bio',
      name: this.translate.instant('about.name'),
      birthDate: '1991-07-25',
      bio: this.translate.instant('about.bio'),
    });
  }
}
