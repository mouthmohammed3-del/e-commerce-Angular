import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Icategory } from '../models/icategory';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class APiProductsService {
  private productsCountSubject = new BehaviorSubject<number>(0);
  productsCount$ = this.productsCountSubject.asObservable();
  updateProductsCount(newCount: number) {
    this.productsCountSubject.next(newCount);
  }

  constructor(private http: HttpClient,private _userAuthService: UserAuthService) { }


getAllproducts(): Observable<Iproduct[]> {
  const token = this._userAuthService.getToken(); // اللي بيرجع التوكن ده
  const headers = token
  ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    : undefined;
  return  this.http.get<Iproduct[]>(`${environment.basedUrl}/products`,{
    headers:headers
  });

    //         })
}

getproductById(id:number):Observable<Iproduct> {

  return this.http.get<Iproduct>(`${environment.basedUrl}/products/${id}`);

}
getproductByCatId(catId:number):Observable<Iproduct[]>{

    // 1. إنشاء "الورقة اللاصقة" وتحديد الشرط
    let myParams = new HttpParams()
    myParams = myParams.append('catId', catId)
    myParams = myParams.append('limit', 2)

    // 2. إرسال الرابط نظيفاً تماماً (بدون علامات ؟ أو &)، وإرفاق الورقة في الخيارات
    return this.http.get<Iproduct[]>(`${environment.basedUrl}/products`, {
      params: myParams
    });


  // return this.http.get<Iproduct[]>(`${environment.basedUrl}/products?catId=${catId}`);



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
