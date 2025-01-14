import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DadAppService } from '../dad-app.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DadCacheService } from '../cache/dad-cache.service';
import { IDadConfig } from './dad-config.interface';
import { DadRoutesService } from '../routes/dad-routes.service';
import { DadThemeService } from '../theme/dad-theme.service';
import { IDadCacheConfig } from '../cache/dad-cache-config.interface';
import { IDadAppConfig } from '../dad-app-config.interface';
import { IDadThemeConfig } from '../theme/dad-theme-config.interface';
import { DENV } from '../../environments/dad-environment.class';
import { DAD_CONFIG_CACHE_KEY } from './dad-config.constants'
import { IDadRoute } from '../routes/dad-route.interface';


@Injectable({
  providedIn: 'root'
})
export class DadInitializerService {
  constructor(private http: HttpClient, private theme: DadThemeService, private router: Router, private routes: DadRoutesService, private app: DadAppService, private cache: DadCacheService) { }
  private tryGetRemoteConfig<T>(base: T, url?: string) {
    if (!url) return of(base)
    return this.http.get<T>(url).pipe(
      map(r => {
        if((base as any[]).length){
          for(let i = (r as any[]).length - 1; i > -1; i--) (base as any[]).unshift((r as any[])[i])
          return base
        }
        return Object.assign(base as any, r) as T
      }),
      catchError(err => {
        console.error(`Failed to pull remote config at ${url}`, err)
        return of(base)
      })
    )
  }
  LoadDadConfig = () => {
    return of(this.cache.Get<IDadConfig>(DAD_CONFIG_CACHE_KEY)).pipe(
      switchMap(cache => {
        if(cache !== null) return of(cache.Data)
        return this.tryGetRemoteConfig<IDadConfig>(DENV.Config ?? {}, DENV.CONFIG_URL).pipe(
          switchMap(config => {
            return this.tryGetRemoteConfig<IDadRoute[]>(config.Routes ?? [], config.RoutesUrl).pipe(
              map(r => {
                if(!config.Routes) config.Routes = [] as IDadRoute[]
                for(let i = r.length - 1; i > -1; i--) config.Routes.unshift(r[i])
                return config
              })
            )
          }),
          switchMap(config => {
            return this.tryGetRemoteConfig<IDadCacheConfig>(config.CacheConfig ?? {}, config.CacheConfigUrl).pipe(
              map(c => {
                if(!config.CacheConfig) config.CacheConfig = {} as IDadCacheConfig
                Object.assign(config.CacheConfig as any, c)
                return config
              })
            )
          }),
          switchMap(config => {
            return this.tryGetRemoteConfig<IDadAppConfig>(config.App ?? {}, config.AppConfigUrl).pipe(
              map(c => {
                if(!config.App) config.App = {} as IDadAppConfig
                Object.assign(config.App as any, c)
                return config
              })
            )
          }),
          switchMap(config => {
            return this.tryGetRemoteConfig<IDadThemeConfig>(config.Theme ?? {}, config.ThemeConfigUrl).pipe(
              map(c => {
                if(!config.Theme) config.Theme = {} as IDadThemeConfig
                Object.assign(config.Theme as any, c)
                return config
              })
            )
          }),
          tap(config => this.cache.Save<IDadConfig>(DENV.CACHE_UNIQUE_KEY ?? DAD_CONFIG_CACHE_KEY, config, DENV.CONFIG_CACHE_LIFETIME_MS))
        )
      }),
      switchMap(config => {
        let routesReady$ = this.routes.LoadInitConfig(config.Routes ?? [])
        this.cache.LoadInitConfig(config.CacheConfig ?? {})
        this.theme.LoadInitConfig(config.Theme ?? {})
        this.app.LoadInitConfig(config.App ?? {})
        return routesReady$
      })
    )
  }
}