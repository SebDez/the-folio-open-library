import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './auth-field.component.html',
})
export class AuthFieldComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) control!: FormControl<string>;

  @Input() type: 'text' | 'email' | 'password' = 'text';
}
