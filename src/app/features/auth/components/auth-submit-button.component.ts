import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-submit-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './auth-submit-button.component.html',
})
export class AuthSubmitButtonComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) loadingLabel!: string;
  @Input() loading = false;
  @Input() disabled = false;
}
