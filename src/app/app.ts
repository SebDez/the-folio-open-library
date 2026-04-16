import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LangService, type SupportedLang } from './core/lang.service';

@Component({
  selector: 'app-root',
  imports: [TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly langService = inject(LangService);

  constructor() {
    this.langService.initLang();
  }

  protected switchLanguage(language: SupportedLang): void {
    this.langService.setLang(language);
  }
}
