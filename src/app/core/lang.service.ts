import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './storage/local-storage.service';

export const SUPPORTED_LANGS = ['fr', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const STORAGE_KEY = 'the-folio-open-library-lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  readonly supported: { code: SupportedLang; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  initLang(): void {
    this.translateService.addLangs([...SUPPORTED_LANGS]);
    const stored = this.localStorageService.getItem<SupportedLang>(STORAGE_KEY);

    if (stored && SUPPORTED_LANGS.includes(stored)) {
      this.translateService.use(stored);
      return;
    }

    this.translateService.use(this.getBrowserLang());
  }

  get currentLang(): SupportedLang {
    const current = this.translateService.currentLang;
    const base = current?.slice(0, 2);
    return SUPPORTED_LANGS.includes(base as SupportedLang) ? (base as SupportedLang) : 'en';
  }

  setLang(lang: SupportedLang): void {
    this.translateService.use(lang);
    this.localStorageService.setItem(STORAGE_KEY, lang);
  }

  private getBrowserLang(): SupportedLang {
    const raw = typeof navigator !== 'undefined' ? navigator.language : '';
    const code = raw?.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(code as SupportedLang) ? (code as SupportedLang) : 'en';
  }
}
