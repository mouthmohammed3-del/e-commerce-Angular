import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarService } from '../../services/sidebar.service';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, AsyncPipe, TranslateModule],
  template: `
    <!-- Main layout with Toggleable Collapsible Sidebar -->
    <div class="d-flex flex-grow-1 flex-nowrap min-vh-100 position-relative">
      
      <!-- Collapsible Sidebar -->
      <app-header></app-header>
      
      <!-- Main Content Container with Top Bar -->
      <div class="d-flex flex-column flex-grow-1 w-100" style="min-width: 0;">
        
        <!-- Top Navigation Bar with Toggle Button -->
        <header class="bg-white border-bottom py-2 px-3 px-md-4 d-flex align-items-center justify-content-between shadow-sm sticky-top" style="z-index: 1020;">
          <div class="d-flex align-items-center gap-3">
            <!-- Sidebar Open/Close Toggle Button -->
            <button 
              type="button"
              class="btn btn-light border rounded-3 d-flex align-items-center justify-content-center p-2 shadow-sm text-primary toggle-btn"
              (click)="sidebarService.toggle()"
              [title]="(sidebarService.isClosed$ | async) ? 'Open Sidebar' : 'Close Sidebar'"
            >
              <i class="bi fs-5" [ngClass]="(sidebarService.isClosed$ | async) ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar'"></i>
            </button>
            
            <h5 class="mb-0 fw-bold text-dark d-none d-sm-block">ShopPro</h5>
          </div>

          <!-- Topbar Language Switcher -->
          <div class="d-flex align-items-center gap-2">
            <button 
              class="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center gap-1 px-3 py-1 fw-semibold" 
              (click)="toggleLanguage()"
            >
              <i class="bi bi-globe"></i>
              {{ currentLang === 'en' ? 'عربي' : 'English' }}
            </button>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="flex-grow-1 p-3 p-md-4 bg-light" style="overflow-x: hidden;">
           <router-outlet></router-outlet>
        </main>
        
        <app-footer></app-footer>
      </div>

    </div>
  `,
  styles: [`
    .toggle-btn {
      width: 38px;
      height: 38px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .toggle-btn:hover {
      background-color: #f1f5f9;
      transform: scale(1.05);
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  sidebarService = inject(SidebarService);
  languageService = inject(LanguageService);
  currentLang: string = 'en';

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage(this.currentLang);
  }
}
