import { Component, OnDestroy, OnInit } from '@angular/core';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/index";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { async, filter, map, Observable, Subscription  } from 'rxjs';
import { Store } from '@ngrx/store';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink,AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   *

   */
  counter:Observable<number>
  subscribtion! :Subscription
  // count!:number
  constructor(private _notificationService: NotificationService, private store:Store<{counter:number}>) {
    this.counter= this.store.select("counter")
    // this.counter.subscribe((newVal)=>{
    //   this.count=newVal
    // })


  }

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
