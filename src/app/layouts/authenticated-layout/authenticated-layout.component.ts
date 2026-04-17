import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
import { FavoriteStore } from '../../core/favorites/favorite.store';

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
  private readonly menuToggleButton = viewChild<ElementRef<HTMLButtonElement>>('menuToggleButton');
  private readonly sidebarPanel = viewChild<ElementRef<HTMLElement>>('sidebarPanel');
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
    protected readonly favoriteStore: FavoriteStore,
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
    const shouldOpen = !this.isSidebarOpen();
    this.isSidebarOpen.set(shouldOpen);
    if (shouldOpen) {
      this.focusSidebarPanel();
      return;
    }

    this.focusMenuButton();
  }

  protected closeSidebar(): void {
    if (!this.isSidebarOpen()) {
      return;
    }

    this.isSidebarOpen.set(false);
    this.focusMenuButton();
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
      this.focusSidebarPanel();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKeydown(): void {
    if (this.isMobileViewport() && this.isSidebarOpen()) {
      this.closeSidebar();
    }
  }

  protected isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  }

  private getInitialSidebarState(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.innerWidth >= 1024;
  }

  private focusMenuButton(): void {
    this.menuToggleButton()?.nativeElement.focus();
  }

  private focusSidebarPanel(): void {
    this.sidebarPanel()?.nativeElement.focus();
  }
}
