import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  PendingRequests = new BehaviorSubject<number>(0)

  constructor() { }

  private pendingRequests: number = 0
  HttpRequestBegin(){
    this.pendingRequests++
    this.PendingRequests.next(this.pendingRequests)
  }
  HttpRequestEnd(){
    this.pendingRequests--
    this.PendingRequests.next(this.pendingRequests)
  }
}
