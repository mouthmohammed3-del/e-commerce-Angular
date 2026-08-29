import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class StaticProductsService {
products!:Iproduct[];
Categorys!:Icategory[];
  constructor() { }

  getAllproducts():Iproduct[]{
    return this.products
  }
  getproductById(id:number):Iproduct|null{
   let fouondpar= this.products.find((prd)=>prd.id==id)
   return fouondpar?fouondpar:null;
  }

  getproductsByCatId(catid:number):Iproduct[]{
    return this.products.filter((prd)=>prd.catId==catid)
  }

  // addproducts(){
  //
  // }
}
