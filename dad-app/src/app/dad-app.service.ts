import { Injectable } from '@angular/core';
import { ReplaySubject, combineLatestWith, map, shareReplay, startWith } from 'rxjs';
import { IDadCache } from './cache/dad-cache.interface';
import { IDadAppConfig } from './dad-app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DadAppService {
  private initConfigCache = new ReplaySubject<IDadAppConfig>(1)
  private pageConfigCache = new ReplaySubject<IDadAppConfig>(1)
  private userConfigCache = new ReplaySubject<IDadAppConfig>(1)
  AppConfig = this.initConfigCache.pipe(
    combineLatestWith(this.pageConfigCache.pipe(startWith({} as IDadAppConfig))),
    map(([init, page]) => Object.assign(init ?? {}, page ?? {})),
    combineLatestWith(this.userConfigCache.pipe(startWith({} as IDadAppConfig))),
    map(([init, user]) => Object.assign(init, user ?? {})),
    shareReplay(1)
  )
  LoadInitConfig = (config: IDadAppConfig) => this.initConfigCache.next(config!)
  OnPageConfig = (config: IDadAppConfig) => this.pageConfigCache.next(config)
  OnUserConfig = (config: IDadAppConfig) => this.userConfigCache.next(config)

  constructor() {  }
}  
