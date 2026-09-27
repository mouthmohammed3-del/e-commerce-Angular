import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { languageAction } from '../store/language/language.action';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private store = inject(Store<{language: string}>);
  private document = inject(DOCUMENT);

  // 1. Current language (Observable to subscribe to)
  currentLanguage$: Observable<string> = this.store.select('language');

  constructor() {
    this.translate.setDefaultLang('en');
  }

  // 2. Initialize language on app startup
  initLanguage(): void {
    const savedLang = (typeof window !== 'undefined' && localStorage.getItem('appLang')) 
      ? localStorage.getItem('appLang')! 
      : 'en';
      
    this.setLanguage(savedLang);
  }

  // 3. Change language & Save preference
  setLanguage(lang: string): void {
    // Save to LocalStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('appLang', lang);
    }
    
    // Update ngx-translate library
    this.translate.use(lang);
    
    // Update NgRx Store state globally
    this.store.dispatch(languageAction({ lang }));

    // Toggle RTL Bootstrap Stylesheet
    this.toggleBootstrapRTL(lang);
  }

  // Helper to easily switch languages
  toggleLanguage(currentLang: string): void {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  // Dynamically load/remove Bootstrap RTL based on language
  private toggleBootstrapRTL(lang: string) {
    if (typeof window === 'undefined') return;

    const rtlStyleId = 'bootstrap-rtl-style';
    const head = this.document.getElementsByTagName('head')[0];
    
    if (lang === 'ar') {
      // Add RTL stylesheet if it doesn't exist
      if (!this.document.getElementById(rtlStyleId)) {
        const link = this.document.createElement('link');
        link.id = rtlStyleId;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
        head.appendChild(link);
      }
    } else {
      // Remove RTL stylesheet when returning to English
      const rtlLink = this.document.getElementById(rtlStyleId);
      if (rtlLink) {
        head.removeChild(rtlLink);
      }
    }
  }
}

