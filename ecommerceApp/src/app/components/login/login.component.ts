import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /**
   *
   */
  constructor(private userAuthSer: UserAuthService) {


  }
  login(){
    this.userAuthSer.login()
  }
  logout(){
    this.userAuthSer.logout();
  }

}
