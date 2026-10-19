import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Read state from localStorage, default to open (false = not closed)
  private isClosedSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('sidebar_closed') === 'true'
  );
  public isClosed$ = this.isClosedSubject.asObservable();

  get isClosed(): boolean {
    return this.isClosedSubject.value;
  }

  toggle(): void {
    const nextState = !this.isClosedSubject.value;
    this.isClosedSubject.next(nextState);
    localStorage.setItem('sidebar_closed', String(nextState));
  }

  open(): void {
    this.isClosedSubject.next(false);
    localStorage.setItem('sidebar_closed', 'false');
  }

  close(): void {
    this.isClosedSubject.next(true);
    localStorage.setItem('sidebar_closed', 'true');
  }
}
