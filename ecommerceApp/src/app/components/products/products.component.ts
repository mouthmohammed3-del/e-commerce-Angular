import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : Iproduct[]
  constructor(){
    this.products = [
      {id:1,name:'Dell laptop 1',price:100,quantity:10,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1},
      {id:2,name:'Hp laptop',price:200,quantity:20,imgUrl:'assets/jordi-zamora-XNvt8TsXOho-unsplash.jpg',catId:2},
      {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'https://via.placeholder.com/150',catId:3},
      {id:4,name:'oppo',price:400,quantity:40,imgUrl:'https://via.placeholder.com/150',catId:4},
      {id:5,name:'samsung',price:500,quantity:0,imgUrl:'https://via.placeholder.com/150',catId:5},
    ]
  }

}
