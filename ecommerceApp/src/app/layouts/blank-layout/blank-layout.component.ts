import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Blank layout for Auth pages like Login and Register -->
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <router-outlet></router-outlet>
    </div>
  `
})
export class BlankLayoutComponent {}
