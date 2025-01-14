import { Injectable } from '@angular/core';
import { first, ReplaySubject } from 'rxjs';
import { IdentityService } from './identity.service';
import { WebsocketService } from './websocket.service';

export interface CLIMessage {
  timestamp: number,
  message: string,
  input?: boolean,
  system?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  message = new ReplaySubject<CLIMessage>()
  connected = false
  private username: string | null = null
  private loggingIn = false
  constructor(private ids: IdentityService, private ws: WebsocketService) { 
    this.message.next({
      timestamp: (new Date()).getTime(),
      message: '🔒 Please enter your username.',
      system: true
    })
    this.ws.message.subscribe(msg => {
      this.message.next({
        message: msg,
        timestamp: (new Date()).getTime()
      })
    })
  }
  send(command: string){
    this.message.next({
      message: command,
      input: true,
      timestamp: (new Date()).getTime()
    })
    if(this.loggingIn){
      return this.message.next({
        message: '⏱ Still attempting login...',
        timestamp: (new Date()).getTime(),
        system: true
      })
    }
    if(!this.connected && !this.username){
      this.username = command
      return this.message.next({
        message: '🔑 Please enter password.',
        timestamp: (new Date()).getTime(),
        system: true
      })
    }
    if(!this.connected && this.username){
      this.loggingIn = true
      this.message.next({
        message: '⚙ Attempting Login...',
        timestamp: (new Date()).getTime(),
        system: true
      })
      this.ids.login({
        username: this.username,
        password: command
      }).pipe(first()).subscribe(
        res => {
          this.ws.createSocket(res)
          this.connected = true
          this.loggingIn = false
          this.message.next({
            timestamp: (new Date()).getTime(),
            message: '👍 Login success.',
            system: true
          })
        },
        err => {
          console.error(err)
          this.connected = false
          this.username = null
          this.message.next({
            message: '✖ Login failure.',
            timestamp: (new Date()).getTime(),
            system: true
          })
          this.message.next({
            message: '🔒 Please enter username.',
            timestamp: (new Date()).getTime(),
            system: true
          })
          this.loggingIn = false
        }
      )}
    if(this.connected){
      this.ws.sendCommand(command)
    }
  }
}
