import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APiProductsService {

  constructor(private http: HttpClient) { }


getAllproducts(): Observable<Iproduct[]> {

  return  this.http.get<Iproduct[]>(`${environment.basedUrl}/products`);

}

getproductById(id:number):Observable<Iproduct> {

  return this.http.get<Iproduct>(`${environment.basedUrl}/products/${id}`);

}
getproductByCatId(catId:number):Observable<Iproduct>{
  return this.http.get<Iproduct>(`${environment.basedUrl}/products?catId=${catId}`);


}

}
