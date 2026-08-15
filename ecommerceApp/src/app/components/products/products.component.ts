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
      {id:1,name:'Product 1',price:100,quantity:10,imgUrl:'https://via.placeholder.com/150',catId:1},
      {id:2,name:'Product 2',price:200,quantity:20,imgUrl:'https://via.placeholder.com/150',catId:2},
      {id:3,name:'Product 3',price:300,quantity:30,imgUrl:'https://via.placeholder.com/150',catId:3},
      {id:4,name:'Product 4',price:400,quantity:40,imgUrl:'https://via.placeholder.com/150',catId:4},
      {id:5,name:'Product 5',price:500,quantity:50,imgUrl:'https://via.placeholder.com/150',catId:5},
    ]
  }

}
