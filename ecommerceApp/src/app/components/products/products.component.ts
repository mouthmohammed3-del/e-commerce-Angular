import { Component, NgModule } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Icategory } from '../../models/icategory';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : Iproduct[];
  categories:any[];
  selectedCatId: number = 0;
 totalPrice: number=0
  constructor(){
    this.products = [
      {id:1,name:'Dell laptop 1',price:100,quantity:8,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1,purchaseQuantity: 3},
      {id:2,name:'Hp laptop',price:200,quantity:50,imgUrl:'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg',catId:1,purchaseQuantity: 1},
      {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:3,purchaseQuantity: 1},
      {id:4,name:'oppo',price:400,quantity:40,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:4,purchaseQuantity: 1},
      {id:5,name:'samsung',price:500,quantity:0,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:5,purchaseQuantity: 1},
    ]
    this.categories = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Smartphones' },
      { id: 3, name: 'Tablets' },
      { id: 4, name: 'Accessories' },
      { id: 5, name: 'Televisions' }
    ];
  }
  /////////filtter///////////

    get filteredProducts(): Iproduct[] {

      // Convert the selected ID to a number (HTML select sometimes turns it into a string)
      let categoryId = Number(this.selectedCatId);

      // If 0 ("All Categories") is selected, return the whole original array
      if (categoryId === 0) {
        return this.products;
      }

      // Otherwise, use JavaScript's built-in .filter() to return only matches
      return this.products.filter(product => product.catId === categoryId);
      // product.catId === categoryId: It asks a true/false question: "Does this product's category ID match the one the user selected?"
///////////////////////////
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
