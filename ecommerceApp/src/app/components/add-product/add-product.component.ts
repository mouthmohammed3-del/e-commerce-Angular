import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {

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
