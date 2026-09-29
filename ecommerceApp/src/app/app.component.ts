import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecommerceApp';
  dir: string = "ltr";

  // 1. Inject the new Language Service
  languageService = inject(LanguageService);

  ngOnInit() {
    // 2. Initialize the language from storage
    this.languageService.initLanguage();

    // 3. Listen to language changes to update RTL/LTR dynamically
    this.languageService.currentLanguage$.subscribe((lang) => {
        this.dir = (lang == "en") ? 'ltr' : 'rtl';
    });
  }
}

