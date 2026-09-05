import { Component, OnInit } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf,CommonModule],//must be imports.
  providers:[],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  /**
   *
   */

  isUserloggedin !:boolean;

  constructor(private userAuthser: UserAuthService) {

  }

  ngOnInit(): void {
    // this.isUserloggedin = this.userAuthser.getUserlogged()

    this.userAuthser.getAuthsubject().subscribe({
      next:(status)=>{
        this.isUserloggedin=status;
      }
    })
  }

}
