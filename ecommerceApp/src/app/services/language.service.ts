import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { languageAction } from '../store/language/language.action';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private store = inject(Store<{language: string}>);

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
  }

  // Helper to easily switch languages
  toggleLanguage(currentLang: string): void {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
