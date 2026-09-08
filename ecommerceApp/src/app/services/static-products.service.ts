import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Icategory } from '../models/icategory';
import { HttpClient } from '@angular/common/http';
import { APiProductsService } from './api-products.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available everywhere
})
export class StaticProductsService {

  private products: Iproduct[];
  private categories: Icategory[] = []; // مؤقتًا فارغة لحين تجهيز البيانات

  constructor(private _ApiProductsService: APiProductsService) {
    this.products = [
      { id: 1, name: 'Dell laptop 1', price: 100, quantity: 8, imgUrl: 'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg', catId: 1, purchaseQuantity: 3 },
      { id: 2, name: 'Hp laptop', price: 200, quantity: 50, imgUrl: 'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg', catId: 1, purchaseQuantity: 1 },
      { id: 3, name: 'Iphone', price: 300, quantity: 30, imgUrl: 'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg', catId: 3, purchaseQuantity: 1 },
      { id: 4, name: 'oppo', price: 400, quantity: 40, imgUrl: 'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg', catId: 4, purchaseQuantity: 1 },
      { id: 5, name: 'samsung', price: 500, quantity: 0, imgUrl: 'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg', catId: 5, purchaseQuantity: 1 },
    ];
  }

  getAllproducts(): Iproduct[] {
    return this.products;
  }

  getproductById(id: number): Iproduct | null {
    const foundProduct = this.products.find(p => p.id === id);
    return foundProduct ?? null;
  }

    getproductsByCatId(catId: number): Iproduct[] {
      if (catId === 0) {
        return this.products;
      }
      return this.products.filter(p => p.catId === catId);
    }
    mapProductsToIds():number[]{
      return this.products.map(p => p.id);
    }
}
