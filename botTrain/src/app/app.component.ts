import { BotManagerService } from './bot-manager.service';
import { Component, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  CurrentPage = 'Upload';
  NoData: boolean;
  NoBot: boolean;
  NoTraining: boolean;

  constructor(private botManager: BotManagerService){
    this.updateUi();
    this.botManager.botChanged.subscribe(botChanged => {
      if (botChanged){
        this.updateUi();
      }
    })
  }
  updateUi(): void{
    console.log('thissource', this.botManager.source)
    this.NoData = this.botManager.source.length === 0;
    this.NoBot = this.botManager.bot.predictor.length === 0 || this.botManager.trainers.length === 0;
    this.NoTraining = this.botManager.training.length === 0;
    if (this.NoData){ this.CurrentPage = 'Upload'; }
    if (!this.NoData && this.NoBot){ this.CurrentPage = 'Configure'; }
  }

  navigate(pageName: string): void {
    this.CurrentPage = pageName;
    this.close();
  }
  close(): void {
    this.sidenav.close();
  }
  deleteBot(): void{
    this.botManager.emptyCache('bot');
  }
  deleteData(): void{
    this.botManager.emptyCache('data');
  }
  deleteTrain(): void{
    this.botManager.emptyCache('train');
  }
}
