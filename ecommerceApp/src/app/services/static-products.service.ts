import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class StaticProductsService {
products!:Iproduct[];
  constructor() { }

  getAllproducts():Iproduct[]{
    return this.products
  }
  getproductById(id:number):Iproduct|null{
   let fouondpar= this.products.find((prd)=>prd.id==id)
   return fouondpar?fouondpar:null;
  }
}
