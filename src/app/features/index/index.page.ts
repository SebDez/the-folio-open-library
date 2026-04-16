import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LangService, type SupportedLang } from '../../core/lang.service';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './index.page.html',
})
export class IndexPage {
  constructor(
    protected readonly authStore: AuthStore,
    private readonly langService: LangService,
    private readonly router: Router,
  ) {}

  protected readonly currentLang = computed(() => this.langService.currentLang);
  protected readonly user = computed(() => this.authStore.user());

  protected switchLanguage(language: SupportedLang): void {
    this.langService.setLang(language);
  }

  protected logout(): void {
    this.authStore.logout();
    void this.router.navigate(['/auth/login']);
  }
}
