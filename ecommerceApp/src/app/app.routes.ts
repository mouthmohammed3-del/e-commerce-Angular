import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'About',component: AboutUsComponent},
  {path:'Products',component:ProductsComponent},
  {path:'Orders',component:OrderComponent}
];

