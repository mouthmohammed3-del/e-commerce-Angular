import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { ProductsComponent } from "../products/products.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ProductsComponent,CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  categories:any[];
  selectedCatId: number = 0;
  totalPrice: number=0;
  num : number =4;
  myData:Date=new Date()
  /**
   *
   */
  constructor() {

    this.categories = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Smartphones' },
      { id: 3, name: 'Tablets' },
      { id: 4, name: 'Accessories' },
      { id: 5, name: 'Televisions' }
    ];

  }
}
