import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../core/auth/auth.store';
import { FolioButtonComponent } from '../../shared/ui/folio-button/folio-button.component';
import { LogoutIconComponent } from '../../shared/icons/logout-icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [RouterOutlet, FolioButtonComponent, LogoutIconComponent, TranslateModule],
  templateUrl: './authenticated-layout.component.html',
})
export class AuthenticatedLayoutComponent {
  private readonly destroyRef = inject(DestroyRef);

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
}
