import { Component, EventEmitter, Input, input, NgModule, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Icategory } from '../../models/icategory';
import { HighlighcardDirective } from '../../Directives/highlighcard.directive';
import { SquarePipe } from '../../pipes/square.pipe';
import { OrderComponent } from '../order/order.component';
import { StaticProductsService } from '../../services/static-products.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    HighlighcardDirective,
    DatePipe,
    SquarePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges {

  products : Iproduct[];

  filteredProducts!:Iproduct[];
  // selectedCatId: number = 0;
  totalPrice: number=0;
 num : number =4;
 @Input() recievedCatId:number=0
  myData:Date=new Date()
  //define event
@Output() onTotalPriceChanged:EventEmitter<number>

  constructor(private _StaticProductsService:StaticProductsService){
    this.products = this._StaticProductsService.getAllproducts()
    // this.products = [
    //   {id:1,name:'Dell laptop 1',price:100,quantity:8,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1,purchaseQuantity: 3},
    //   {id:2,name:'Hp laptop',price:200,quantity:50,imgUrl:'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg',catId:1,purchaseQuantity: 1},
    //   {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:3,purchaseQuantity: 1},
    //   {id:4,name:'oppo',price:400,quantity:40,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:4,purchaseQuantity: 1},
    //   {id:5,name:'samsung',price:500,quantity:0,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:5,purchaseQuantity: 1},
    // ]

    this.filteredProducts = this.products;

    this.onTotalPriceChanged=new EventEmitter<number>()
  }
  ngOnChanges() {
    this.filteredProducts = this._StaticProductsService.getproductsByCatId(this.recievedCatId)
  }

  // filterProducts() {
  //   // 1. If "All Categories" (0) is selected, show everything.
  //   if (this.recievedCatId == 0) {
  //     this.filteredProducts = this.products;
  //   }
  //   // 2. Otherwise, filter the original array and SAVE it to filteredProducts.
  //   else {
  //     this.filteredProducts = this.products.filter(
  //       (product) => product.catId == this.recievedCatId
  //     );
  //   }
  // }
  /////////filtter///////////
//
//      filterProducts(){
//   //
// //   //       // Convert the selected ID to a number (HTML select sometimes turns it into a string)
//           //  let categoryId = Number(this.recievedCatId);
// //   //
// //   //       // If 0 ("All Categories") is selected, return the whole original array
//           if ( this.recievedCatId==0) {
//            this.filteredProducts = this.products;
//          }else{
//           this.filteredProducts=this.products.filter((product) => product.catId == this.recievedCatId);
// 
//          }

//
//         // Otherwise, use JavaScript's built-in .filter() to return only matches

        // product.catId === categoryId: It asks a true/false question: "Does this product's category ID match the one the user selected?"
  ///////////////////////////
//  }
  buy(product: Iproduct){

        let count = product.purchaseQuantity ?? 1;

  if (count > 0 && product.quantity >= count) {

    // Deduct the stock
    product.quantity -= count;


    // Calculate the price
    this.totalPrice += count  * product.price;

    //2- fire  event
    this.onTotalPriceChanged.emit(this.totalPrice)
    alert(`Bought ${count} of ${product.name} for $${this.totalPrice}`);

    // Reset the input back to 1
    product.purchaseQuantity = 1;

  } else {
    alert('Invalid quantity or not enough stock!');
  }


   }


 }

