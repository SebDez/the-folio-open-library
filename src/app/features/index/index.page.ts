import { Component, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './index.page.html',
})
export class IndexPage {
  constructor(protected readonly authStore: AuthStore) {}

  protected readonly userName = computed<string>(() => this.authStore.user()?.name ?? '');
  protected readonly homeTitleParams = computed<{ name: string }>(() => ({
    name: this.userName(),
  }));
}
