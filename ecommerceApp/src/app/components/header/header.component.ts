import { Component, OnInit, inject } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { APiProductsService } from '../../services/api-products.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, CommonModule, TranslateModule],
  providers:[],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  productsCount: number = 0;
  isUserloggedin !:boolean;
  currentLang: string = 'en';

  // Inject LanguageService
  languageService = inject(LanguageService);

  constructor(
    private userAuthser: UserAuthService,
    private _APiproductsservice: APiProductsService
  ) {}

  ngOnInit(): void {
    this._APiproductsservice.getAllproducts().subscribe({
      next: (res) => {
        this._APiproductsservice.updateProductsCount(res.length);
      },
      error: (err) => console.log(err)
    });

    this._APiproductsservice.productsCount$.subscribe({
      next: (count) => {
        this.productsCount = count;
      }
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
}


