import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../core/auth/auth.store';
import { FolioButtonComponent } from '../../shared/ui/folio-button/folio-button.component';
import { LogoutIconComponent } from '../../shared/icons/logout-icon.component';
import { LangSelectorComponent } from '../../shared/ui/lang-selector/lang-selector.component';
import { MenuIconComponent } from '../../shared/icons/menu-icon.component';
import { SearchIconComponent } from '../../shared/icons/search-icon.component';
import { HeartIconComponent } from '../../shared/icons/heart-icon.component';
import { InfoCircleIconComponent } from '../../shared/icons/info-circle-icon.component';

interface AuthenticatedLayoutModule {
  key: string;
  labelKey: string;
  route: string;
}
@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FolioButtonComponent,
    LogoutIconComponent,
    TranslateModule,
    LangSelectorComponent,
    MenuIconComponent,
    SearchIconComponent,
    HeartIconComponent,
    InfoCircleIconComponent,
  ],
  templateUrl: './authenticated-layout.component.html',
})
export class AuthenticatedLayoutComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isSidebarOpen = signal(this.getInitialSidebarState());
  protected readonly modules = signal<AuthenticatedLayoutModule[]>([
    {
      key: 'search',
      labelKey: 'layouts.authenticated.modules.search',
      route: '/',
    },
    {
      key: 'favorites',
      labelKey: 'layouts.authenticated.modules.favorites',
      route: '/favorites',
    },
    {
      key: 'about',
      labelKey: 'layouts.authenticated.modules.about',
      route: '/about',
    },
  ]);

  constructor(
    protected readonly authStore: AuthStore,
    private readonly router: Router,
  ) {
    this.authStore.logoutObs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => void this.router.navigate(['/auth/login']));
  }

  protected logout(): void {
    this.authStore.logout();
  }

  protected toggleSidebar(): void {
    this.isSidebarOpen.update((isOpen) => !isOpen);
  }

  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  protected handleSidebarNavigation(): void {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.closeSidebar();
    }
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && !this.isSidebarOpen()) {
      this.isSidebarOpen.set(true);
    }
  }

  private getInitialSidebarState(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.innerWidth >= 1024;
  }
}
