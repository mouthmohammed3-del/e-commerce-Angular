import { Component, NgModule } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : Iproduct[]
 totalPrice: number=0
  constructor(){
    this.products = [
      {id:1,name:'Dell laptop 1',price:100,quantity:10,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1,purchaseQuantity: 3},
      {id:2,name:'Hp laptop',price:200,quantity:20,imgUrl:'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg',catId:2,purchaseQuantity: 1},
      {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:3,purchaseQuantity: 1},
      {id:4,name:'oppo',price:400,quantity:40,imgUrl:'https://via.placeholder.com/150',catId:4,purchaseQuantity: 1},
      {id:5,name:'samsung',price:500,quantity:0,imgUrl:'https://via.placeholder.com/150',catId:5,purchaseQuantity: 1},
    ]
  }

  buy(product: Iproduct){
    let count = product.purchaseQuantity ?? 1;

  if (count > 0 && product.quantity >= count) {

    // Deduct the stock
    product.quantity -= count;

    // Calculate the price
    this.totalPrice += count  * product.price;
    alert(`Bought ${count} of ${product.name} for $${this.totalPrice}`);

    // Reset the input back to 1
    product.purchaseQuantity = 1;

  } else {
    alert('Invalid quantity or not enough stock!');
  }


  }

}
