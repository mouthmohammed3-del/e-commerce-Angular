import { Component, OnInit, inject } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { APiProductsService } from '../../services/api-products.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, CommonModule, TranslateModule],
  providers:[],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  cartCount: number = 0;
  cartTotal: number = 0;
  isUserloggedin !:boolean;
  currentLang: string = 'en';

  // Inject Services
  languageService = inject(LanguageService);
  cartService = inject(CartService);

  constructor(
    private userAuthser: UserAuthService,
    private _APiproductsservice: APiProductsService
  ) {}

  ngOnInit(): void {
    // 1. Subscribe to Cart count
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    // 2. Subscribe to Cart Total Price
    this.cartService.totalPrice$.subscribe(total => {
      this.cartTotal = total;
    });

    this.userAuthser.isUserLogged$.subscribe({
      next: (status) => {
        this.isUserloggedin = status;
      }
    });

    // Listen to current language from the service
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage(this.currentLang);
  }

  logout() {
    this.userAuthser.logout();
  }
}


