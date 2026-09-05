import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  // isUserLigged:boolean=false;
private  authSubject!:BehaviorSubject<boolean>;

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
getAuthsubject():BehaviorSubject<boolean>{

  return this.authSubject;

}

}
