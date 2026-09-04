import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  isUserLigged:boolean=false;

  constructor() { }

  login(){
    localStorage.setItem('token',"sfjfsghsfg245tgs")
  }
  logout(){
    localStorage.removeItem('token')
  }
getUserlogged():boolean{
 return  localStorage.getItem('token')?true:false;
}

}
