import { Component, OnDestroy, OnInit } from '@angular/core';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/index";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { filter, map, Subscription  } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   *

   */
  subscribtion! :Subscription
  constructor(private _notificationService: NotificationService) {}

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

    this._notificationService.getnotification().pipe(

      map((msg)=> `${msg} hi hi hi hi`),

       filter((msg)=>msg.startsWith('mohammed'))

    ).subscribe({
      next:(notification)=>{
        console.log(notification);
      },
      error:(err)=>{
        console.log(err);

      },
      complete:()=>{
        console.log("notification completed Successfull");

      },
    });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()

  }
}
