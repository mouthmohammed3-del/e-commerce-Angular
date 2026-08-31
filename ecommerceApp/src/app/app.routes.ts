import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'About',component: AboutUsComponent},
  {path:'Products',component:ProductsComponent},
  {path:'Dashboard',component:ProductsComponent},
  {path:'Orders',component:OrderComponent},
  // maust by the last one  
  {path:'**',component:NotFoundComponent}
];

