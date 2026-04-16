import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folio-button',
  standalone: true,
  templateUrl: './folio-button.component.html',
})
export class FolioButtonComponent {
  @Input() label = '';
  @Input() loadingLabel = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() loading = false;
  @Input() disabled = false;
}
