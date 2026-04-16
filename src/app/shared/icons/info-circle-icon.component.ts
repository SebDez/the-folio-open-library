import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-circle-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.class]="className"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10" cy="10" r="8.75" stroke="currentColor" stroke-width="1.5" />
      <path d="M10 8.8v5.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="10" cy="6.35" r="0.9" fill="currentColor" />
    </svg>
  `,
})
export class InfoCircleIconComponent {
  @Input() size = 16;
  @Input() className = 'text-slate-400';
}
