import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.class]="className"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m12 21-1.45-1.32C5.4 15.02 2 11.98 2 8.25 2 5.21 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.21 22 8.25c0 3.73-3.4 6.77-8.55 11.44z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class HeartIconComponent {
  @Input() size = 24;
  @Input() className = '';
}
