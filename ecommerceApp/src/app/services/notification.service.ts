import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', //This means Angular provides one application-wide instance of this Service.
})
export class NotificationService {
  notifications: string[];
  constructor() {
    this.notifications = [
      'You have unread messages',
      'people reacting  to your post',
      'mohammed sent you a friend request',

      'post shared successfully',
      '',
    ];
  }
  getnotification():Observable<string> {
    return  new Observable<string>((observer) => {
      // observer.next()
      // observer.error()
      // observer.complete();
      let counter = 0;
    let notificationsetInterval = setInterval(() => { //It repeatedly executes code after a specific amount of time.
        console.log('test');


        if(counter===this.notifications.length){
          observer.complete()
        }
        if(this.notifications[counter]==''){
          observer.error("thi notificaion is empty")
        }
        observer.next(this.notifications[counter]);
        counter++;
      }, 2000);
      return{
        unsubscribe:()=>{
        clearInterval(notificationsetInterval)

      }


      }

    });
  }
}
