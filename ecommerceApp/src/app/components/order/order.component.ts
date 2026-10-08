import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { ProductsComponent } from "../products/products.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { NationalIdDatePipe } from "../../pipes/national-id-date.pipe";

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ProductsComponent, CurrencyPipe, DatePipe, NationalIdDatePipe, TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, AfterViewInit {

  categories:any[];
  selectedCatId: number = 0;
  recivedtotalPrice: number = 0;
  num : number =4;
  MyData:Date=new Date()

@ViewChild('userNameInp') myInp!:ElementRef;

  constructor(private cartService: CartService) {
    this.categories = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Smartphones' },
      { id: 3, name: 'Tablets' },
      { id: 4, name: 'Accessories' },
      { id: 5, name: 'Televisions' },
    ];
  }
  
  ngOnInit(): void {
    this.cartService.totalPrice$.subscribe(total => {
      this.recivedtotalPrice = total;
    });
  }

  ngAfterViewInit(): void {
    this.myInp.nativeElement.value="muath";
  }
}
