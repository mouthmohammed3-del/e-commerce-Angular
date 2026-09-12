import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class APiProductsService {
  private productsCountSubject = new BehaviorSubject<number>(0);
  productsCount$ = this.productsCountSubject.asObservable();
  updateProductsCount(newCount: number) {
    this.productsCountSubject.next(newCount);
  }

  constructor(private http: HttpClient) { }


getAllproducts(): Observable<Iproduct[]> {

  return  this.http.get<Iproduct[]>(`${environment.basedUrl}/products`);

}

getproductById(id:number):Observable<Iproduct> {

  return this.http.get<Iproduct>(`${environment.basedUrl}/products/${id}`);

}
getproductByCatId(catId:number):Observable<Iproduct[]>{
  return this.http.get<Iproduct[]>(`${environment.basedUrl}/products?catId=${catId}`);



}
addproduct(newproduct:Iproduct):Observable<Iproduct>{
  return this.http.post<Iproduct>(`${environment.basedUrl}/products`,newproduct);
}
deleteproduct(id: number): Observable<void> {
  return this.http.delete<void>(`${environment.basedUrl}/products/${id}`);
}

updateproduct(id: number, updatedProduct: Iproduct): Observable<Iproduct> {
  return this.http.put<Iproduct>(`${environment.basedUrl}/products/${id}`, updatedProduct);
}
getAllCategories(): Observable<Icategory[]> {
  return this.http.get<Icategory[]>(`${environment.basedUrl}/categories`);
}
}
