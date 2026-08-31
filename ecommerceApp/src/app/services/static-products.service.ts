import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root' //This makes the service available everywhere

})
export class StaticProductsService {

products:Iproduct[];
Categorys!:Icategory[];

  constructor() {
    this.products = [
        {id:1,name:'Dell laptop 1',price:100,quantity:8,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1,purchaseQuantity: 3},
        {id:2,name:'Hp laptop',price:200,quantity:50,imgUrl:'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg',catId:1,purchaseQuantity: 1},
        {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:3,purchaseQuantity: 1},
        {id:4,name:'oppo',price:400,quantity:40,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:4,purchaseQuantity: 1},
        {id:5,name:'samsung',price:500,quantity:0,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:5,purchaseQuantity: 1},
      ]

  }

  getAllproducts():Iproduct[]{
    return this.products
  }
  getproductById(id:number):Iproduct|null{
   let fouondpar= this.products.find((prd)=>prd.id==id)
   return fouondpar?fouondpar:null;
  }

  getproductsByCatId(catid:number):Iproduct[]{
    if(catid == 0){
      return this.products;
    }
    else{
    return this.products.filter((prd)=>prd.catId == catid)
    }
  }

  // addproducts(){
  //
  // }
}
