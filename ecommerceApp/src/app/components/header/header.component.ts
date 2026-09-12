import { Component, OnInit } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { APiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf,CommonModule],//must be imports.
  providers:[],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  /**
   *
   */
  productsCount: number = 0;
  isUserloggedin !:boolean;

  constructor(private userAuthser: UserAuthService,private _APiproductsservice:APiProductsService) {

  }

  ngOnInit(): void {

    // 1. جلب المنتجات وحساب عددها للشارة (Badge)
    this._APiproductsservice.getAllproducts().subscribe({
      next: (res) => {
        // نحدث العدد في الخدمة
        this._APiproductsservice.updateProductsCount(res.length);
      },
      error: (err) => console.log(err)
    });

    // 2. الـ Header الآن يشترك (يستمع) لأي تغيير يحدث في العدد في أي مكان في التطبيق!
    this._APiproductsservice.productsCount$.subscribe({
      next: (count) => {
        this.productsCount = count; // تحديث الرقم في الـ HTML فوراً
      }
    });

    // 2. الاستماع المستمر لحالة تسجيل الدخول (Auth)
    this.userAuthser.isUserLogged$.subscribe({
      next: (status) => {
        this.isUserloggedin = status;
      }
    });

  }

}
