import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-books-pagination',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './books-pagination.component.html',
})
export class BooksPaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 1;
  @Input({ required: true }) canGoPrevious = false;
  @Input({ required: true }) canGoNext = false;
  @Input({ required: true }) isLoading = false;
  @Input({ required: true }) startItem = 0;
  @Input({ required: true }) endItem = 0;
  @Input({ required: true }) totalResults = 0;

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() pageSelected = new EventEmitter<number>();

  protected readonly pageWindow = 2;

  protected get visiblePages(): number[] {
    const start = Math.max(1, this.currentPage - this.pageWindow);
    const end = Math.min(this.totalPages, this.currentPage + this.pageWindow);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  protected onPrevious(): void {
    this.previous.emit();
  }

  protected onNext(): void {
    this.next.emit();
  }

  protected onSelectPage(page: number): void {
    this.pageSelected.emit(page);
  }
}
