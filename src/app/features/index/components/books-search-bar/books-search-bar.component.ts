import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SearchIconComponent } from '../../../../shared/icons/search-icon.component';
import { FolioButtonComponent } from '../../../../shared/ui/folio-button/folio-button.component';

@Component({
  selector: 'app-books-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, SearchIconComponent, FolioButtonComponent],
  templateUrl: './books-search-bar.component.html',
})
export class BooksSearchBarComponent {
  @Input({ required: true }) value = '';
  @Input() loading = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  protected onInputChange(value: string): void {
    this.valueChange.emit(value);
  }

  protected onSearch(): void {
    this.search.emit();
  }
}
