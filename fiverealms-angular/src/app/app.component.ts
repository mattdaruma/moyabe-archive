import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { CLIMessage, CommandService } from './command.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiverealms-angular'
  messages: CLIMessage[] = []
  commandInput = new FormControl('')
  constructor(public cms: CommandService) {
    window.scrollTo(0, 0)
    this.cms.message.subscribe(msg => {
      this.messages.unshift(msg)
      if(this.messages.length > 1000) this.messages.pop()
    })
  }
  sendCommand(){
    if(this.commandInput?.value) this.cms.send(this.commandInput?.value)
    this.commandInput.reset()
  }
}
