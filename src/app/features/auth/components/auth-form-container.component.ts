import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-form-container',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './auth-form-container.component.html',
})
export class AuthFormContainerComponent {}
