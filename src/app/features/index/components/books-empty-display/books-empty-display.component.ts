import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-empty-display',
  standalone: true,
  templateUrl: './books-empty-display.component.html',
})
export class BooksEmptyDisplayComponent {
  @Input({ required: true }) message = '';
}
