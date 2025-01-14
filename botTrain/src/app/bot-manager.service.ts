import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface BotTrainer {
  column: string;
  weight: number;
}
interface Bot {
  name: string;
  desc: string;
  predictor: string;
}
@Injectable({
  providedIn: 'root'
})
export class BotManagerService {
  botChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public source: any[] = [];
  public headers: string[] = [];
  public trainers: BotTrainer[] = [];
  public training: any[] = [];
  public bot: Bot = {
    name: '',
    desc: '',
    predictor: ''
  };
  public inputs: any[] = [];
  private cachePaths = {
    source: `${window.location}-bot-source`,
    bot: `${window.location}-bot-bot`,
    training: `${window.location}-bot-training`
  };
  constructor() {
    const cachedSource = JSON.parse(localStorage.getItem(this.cachePaths.source));
    if (cachedSource && cachedSource.length > 0){ this.uploadData(cachedSource); }
    const cachedBot = JSON.parse(localStorage.getItem(this.cachePaths.bot)) as Bot;
    if (cachedBot){ this.uploadBot(cachedBot); }
  }
  uploadData(newData: any[]): void{
    if (!newData || newData.length === 0) { newData = []; }
    this.source = newData;
    const newHeaders = [];
    if (newData.length > 0){
      for (const header in newData[0]){
        if (true){
          newHeaders.push(header);
        }
      }
    }
    this.headers = newHeaders;
    localStorage.setItem(this.cachePaths.source, JSON.stringify(this.source));
    this.botChanged.next(true);
  }
  uploadBot(newBot: Bot): void{
    this.bot = newBot;
    localStorage.setItem(this.cachePaths.bot, JSON.stringify(this.bot));
    this.botChanged.next(true);
  }
  emptyCache(cacheName: string): void{
    switch (cacheName){
      case 'bot':
        localStorage.setItem(this.cachePaths.bot, null);
        break;
      case 'data':
        localStorage.setItem(this.cachePaths.source, null);
        break;
      case 'train':
        localStorage.setItem(this.cachePaths.training, null);
        break;
      default:
        localStorage.setItem(this.cachePaths.bot, null);
        localStorage.setItem(this.cachePaths.source, null);
        localStorage.setItem(this.cachePaths.training, null);
        break;
    }
    window.location.reload();
  }
}
