import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/index";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(private _notificatonSer: NotificationService) {}
  ngOnInit(): void {
    //     this._notificatonSer.getnotification().subscribe((notification)=>{
    //       console.log(notification);
    //
    //
    //     },(error)=>{
    //       console.log(`-------${error}----------- `);
    //
    //
    //     }
    //
    //   );
    
    this._notificatonSer.getnotification().subscribe({
      next:(notification)=>{
        console.log(notification);
      },
      error:(err)=>{
        console.log(err);

      },
      complete:()=>{
        console.log("notification completed Successfull");

      },
    })
  }
}
