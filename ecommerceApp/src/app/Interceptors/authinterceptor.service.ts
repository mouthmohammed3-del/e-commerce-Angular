import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";

export function authinterceptor(req:HttpRequest<any>,next:HttpHandlerFn){
console.log(req);

return next(req);

if(req.method === 'POST'){

const modifiedreq = req.clone({

  headers:req.headers.set('lang','en  ') });
//   const modifiedreq = req.clone({
//     headers:req.headers.set('Authorization','Bearer mytoken') });
//   return next(modifiedreq);
//
//
//
//
// \
return next(modifiedreq ).pipe(
  tap((event)=>{
    console.log(event);
  })
);

}

}
