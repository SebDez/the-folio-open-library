import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LangService, SupportedLang } from '../../../core/lang.service';

@Component({
  selector: 'app-lang-selector',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './lang-selector.component.html',
})
export class LangSelectorComponent {
  private readonly $el = inject(ElementRef<HTMLElement>);

  protected readonly currentLang = signal<SupportedLang>('en');
  protected readonly isSelectorOpen = signal<boolean>(false);

  constructor(
    protected readonly langService: LangService,
    private readonly translateService: TranslateService,
  ) {
    this.currentLang.set(this.langService.currentLang);
    this.translateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.currentLang.set(this.langService.currentLang);
    });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.isSelectorOpen() && !this.$el.nativeElement.contains(event.target as Node)) {
      this.isSelectorOpen.set(false);
    }
  }

  protected toggle(): void {
    this.isSelectorOpen.update((v) => !v);
  }

  protected selectLang(lang: SupportedLang): void {
    this.langService.setLang(lang);
    this.currentLang.set(lang);
    this.isSelectorOpen.set(false);
  }
}
