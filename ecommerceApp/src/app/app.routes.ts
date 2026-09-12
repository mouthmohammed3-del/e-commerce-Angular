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
import { authGuard } from './guards/auth.guard';
import { UserAuthService } from './services/user-auth.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductFormComponent } from './components/Admin/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Dashboard', component: HomeComponent },
  // {
  //   path: 'Home',
  //   component: HomeComponent,
  //   children: [{ path: 'Products', component: ProductsComponent }],
  // },
  { path: 'login', component: LoginComponent },
  { path: 'Details/:id', component: DetailsComponent },
  { path: 'Products', component: ProductsComponent,canActivate:[authGuard]},
  {
    path: 'About',
    component: AboutUsComponent,
    children: [
      // {path:'',component:VisionComponent},
      { path: '', redirectTo: 'About/Vision', pathMatch: 'full' }, //
      { path: 'Vision', component: VisionComponent },
      { path: 'Values', component: ValuesComponent },
    ],
  },
  { path: 'product/add', component: ProductFormComponent,canActivate:[authGuard] }, // مسار وضع الإضافة

  // مسار وضع التعديل (يستقبل ID)
  { path: 'product/edit/:id', component: ProductFormComponent,canActivate:[authGuard] },
  { path: 'Orders', component: OrderComponent },
  { path: 'add-product', component: AddProductComponent,canActivate:[authGuard] },

  // maust by the last one
  { path: '**', component: NotFoundComponent },
];
