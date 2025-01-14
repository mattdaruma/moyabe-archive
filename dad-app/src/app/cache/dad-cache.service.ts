import { Injectable } from '@angular/core';
import { IDadCache } from './dad-cache.interface';
import { Observable, ReplaySubject, combineLatestWith, map, of, shareReplay, startWith } from 'rxjs';
import { IDadCacheConfig } from './dad-cache-config.interface';
import { DENV } from '../../environments/dad-environment.class';
import { DefaultBaseKey, DefaultMetaKey } from './dad-cache.constants';

@Injectable({
  providedIn: 'root'
})
export class DadCacheService {
  private now = () => (new Date()).getTime()
  private initConfig = new ReplaySubject<IDadCacheConfig>(1)
  LoadInitConfig = (cacheConfig: IDadCacheConfig) => this.initConfig.next(cacheConfig)
  private userConfig = new ReplaySubject<IDadCacheConfig>(1)
  LoadUserConfig = (cacheConfig: IDadCacheConfig) => this.userConfig.next(cacheConfig)
  CacheConfig = this.initConfig.pipe(
    combineLatestWith(this.userConfig.pipe(startWith({} as IDadCache<IDadCacheConfig>))),
    map(([init, user])=> Object.assign(init, user)),
    shareReplay(1)
  )
  private getFullKey = (key: string) => `${this.baseKey}-${key}`
  private getMeta() {
    let cache = localStorage.getItem(this.getFullKey(this.metaKey))
    if (cache === null) return []
    return JSON.parse(cache)
  }
  private setMeta(meta: string[]) {
    localStorage.setItem(this.getFullKey(this.metaKey), JSON.stringify(meta))
  }
  get Meta(){ return this.getMeta()}
  Count = () => this.getMeta().length
  private baseKey: string = DENV.CACHE_UNIQUE_KEY ?? DefaultBaseKey
  private metaKey: string = this.getFullKey(DefaultMetaKey)
  constructor() { }
  Save = <T>(key: string, data: any, lifespanMs: number | null = DENV.CONFIG_CACHE_LIFETIME_MS ?? 0): IDadCache<T> => {
    let cache = {
      Data: data,
      CreatedUnix: this.now(),
      ExpiresUnix: lifespanMs !== null ? this.now() + lifespanMs : lifespanMs
    } as IDadCache<T>
    localStorage.setItem(this.getFullKey(key), JSON.stringify(cache))
    let keys = this.getMeta()
    if (!keys.includes(this.getFullKey(key))) keys.push(this.getFullKey(key))
    this.setMeta(keys)
    return cache
  }
  GetOrMakeAsync<T>(key: string, call: Observable<T | null>, refreshMs?: number | null | undefined){
    let cache = this.Get<T>(key)
    if (cache !== null && (!refreshMs || cache.CreatedUnix > refreshMs)) return of(cache)
    return call.pipe(map(data =>this.Save<T>(key, data, refreshMs)))
  }
  Get<T>(key: string, refreshUnix?: number | undefined): IDadCache<T> | null {
    let raw: string | null = localStorage.getItem(this.getFullKey(key))
    if (raw === null) return null
    let cache = JSON.parse(raw) as IDadCache<T>
    if (
      (cache.ExpiresUnix && this.now() < cache.ExpiresUnix)
      || (refreshUnix && refreshUnix > cache.CreatedUnix)
      ) {
      this.Clear(key)
      return null
    }
    return cache
  }
  Clear(key: string) {
    let keys = this.getMeta()
    if (keys.includes(key)) keys.splice(keys.indexOf(key), 1)
    this.setMeta(keys)
    localStorage.removeItem(this.getFullKey(key))
  }
  ClearApp() {
    let keys = this.getMeta()
    for (let key of keys) localStorage.removeItem(key)
    this.setMeta([])
  }
  ClearAll() {
    localStorage.clear()
  }
}
