import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- Main layout with Collapsible Sidebar and Main Content -->
    <div class="d-flex flex-grow-1 flex-nowrap min-vh-100 position-relative">
      
      <!-- Collapsible Sidebar with Internal Toggle -->
      <app-header></app-header>
      
      <!-- Main Content Area -->
      <main class="flex-grow-1 p-3 p-md-4 bg-light" style="overflow-x: hidden; min-width: 0;">
         <router-outlet></router-outlet>
      </main>

    </div>
    
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent {}
