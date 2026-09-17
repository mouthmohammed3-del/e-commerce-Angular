import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
//علامة $ تخبر المبرمجين أن هذا المتغير هو:
// Observable أي شيء يمكننا الاستماع إليه باستخدام:
  // isUserLigged:boolean=false;
   private  authSubject=new BehaviorSubject<boolean>(false);
   isUserLogged$ = this.authSubject.asObservable();

  constructor() {
    this.authSubject= new BehaviorSubject<boolean>(false);
  }

  login(){
    localStorage.setItem('token',"sfjfsghsfg245tgs");
    this.authSubject.next(true);
  }
  logout(){
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
getUserlogged():boolean{
 return  localStorage.getItem('token')?true:false;
}

getToken():string|null{
  return localStorage.getItem('token');
}
// getAuthsubject():BehaviorSubject<boolean>{
//
//   return this.authSubject;
//
// }

}
