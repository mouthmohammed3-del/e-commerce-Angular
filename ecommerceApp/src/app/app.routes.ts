import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VisionComponent } from './components/vision/vision.component';
import { ValuesComponent } from './components/values/values.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { UserAuthService } from './services/user-auth.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductFormComponent } from './components/Admin/product-form/product-form.component';
import { RegisterComponent } from './components/register/register.component';

// استيراد الـ Layouts الجديدة
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  
  // 1. مسارات الـ Auth (صفحات لا تحتوي على Navbar و Footer)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
      { path: 'Register', component: RegisterComponent, canActivate: [guestGuard] }
    ]
  },

  // 2. المسارات الأساسية (تحتوي على Navbar و Footer)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'Dashboard', component: HomeComponent },
      { path: 'Details/:id', component: DetailsComponent },
      {
        path: 'Products',
        loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
        canActivate: [authGuard]
      },
      {
        path: 'About',
        component: AboutUsComponent,
        children: [
          { path: '', redirectTo: 'Vision', pathMatch: 'full' },
          { path: 'Vision', component: VisionComponent },
          { path: 'Values', component: ValuesComponent },
        ],
      },
      { path: 'product/add', component: ProductFormComponent, canActivate: [authGuard] },
      {
        path: 'product/edit/:id',
        loadComponent: () => import('./components/Admin/product-form/product-form.component').then(m => m.ProductFormComponent),
        canActivate: [authGuard]
      },
      { path: 'Orders', component: OrderComponent },
      { path: 'Cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
      { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] }
    ]
  },

  // 3. صفحة الخطأ توضع في مسار فارغ لأنها لا تحتاج Navbar
  {
    path: '**',
    component: BlankLayoutComponent,
    children: [
      { path: '', component: NotFoundComponent }
    ]
  }
];
