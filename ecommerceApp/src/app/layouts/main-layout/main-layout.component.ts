import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- Main layout with Sidebar and Footer for dashboard pages -->
    <div class="d-flex flex-grow-1 flex-nowrap">
      
      <!-- Sidebar / Header -->
      <app-header></app-header>
      
      <!-- Main Content area -->
      <main class="flex-grow-1 p-4 bg-light" style="overflow-x: hidden;">
         <router-outlet></router-outlet>
      </main>

    </div>
    
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent {}
