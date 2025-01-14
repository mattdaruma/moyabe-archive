import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ws: WebSocketSubject<any> | null = null
  message = new Subject<any>()
  error = new Subject<any>()
  complete = new Subject<string>()
  constructor() { }
  createSocket(authToken: string){
    console.log('🤖 CREATING SOCKET')
    this.ws = webSocket(`ws://localhost:8081/?authorization=${authToken}`)
    this.ws.subscribe({
      next: msg => this.message.next(msg),
      error: err => this.error.next(err),
      complete: () => this.complete.next('WebSocket Closed')
    })
  }
  sendCommand(command: string){
    this.ws?.next({
      command: command,
      timestamp: (new Date()).getTime()
    })
  }
}
