import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

export function authinterceptor(req:HttpRequest<any>,next:HttpHandlerFn){
console.log(req);

return next(req);




}
