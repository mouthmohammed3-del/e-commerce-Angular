import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { ProductsComponent } from "../products/products.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { NationalIdDatePipe } from "../../pipes/national-id-date.pipe";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ProductsComponent, CurrencyPipe, DatePipe, NationalIdDatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  categories:any[];
  selectedCatId: number = 0;
  recivedtotalPrice: number=0;
  num : number =4;
  MyData:Date=new Date()

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

  CalcTotalPrice(top:number){
    this.recivedtotalPrice=top
  }
}
