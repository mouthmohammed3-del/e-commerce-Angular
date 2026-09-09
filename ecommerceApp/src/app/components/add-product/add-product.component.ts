import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
newProduct: Iproduct={} as Iproduct;
categories :Icategory[] ;

  /**
   *
   */
  constructor() {


 this.categories= [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home & Kitchen' }
  ];

  }


}
