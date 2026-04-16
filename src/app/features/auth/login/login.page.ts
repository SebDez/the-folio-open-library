import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthStore } from '../../../core/auth/auth.store';
import { AuthFieldComponent } from '../components/auth-field.component';
import { AuthFormContainerComponent } from '../components/auth-form-container.component';
import { AuthSubmitButtonComponent } from '../components/auth-submit-button.component';
import { InfoCircleIconComponent } from '../../../shared/icons/info-circle-icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    AuthFormContainerComponent,
    AuthFieldComponent,
    AuthSubmitButtonComponent,
    InfoCircleIconComponent,
  ],
  templateUrl: './login.page.html',
})
export class LoginPage {
  protected readonly form = new FormGroup({
    email: new FormControl('demo@local', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('demo', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    protected readonly authStore: AuthStore,
    private readonly router: Router,
  ) {
    effect(() => {
      if (!this.authStore.isLoggedIn()) return;
      void this.router.navigateByUrl('/');
    });
  }

  protected submit(): void {
    if (this.form.invalid || this.authStore.loading()) return;
    const { email, password } = this.form.getRawValue();
    this.authStore.login(email, password);
  }
}
