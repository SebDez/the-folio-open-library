import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangService } from './core/lang.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  constructor(private readonly langService: LangService) {
    this.langService.initLang();
  }
}
