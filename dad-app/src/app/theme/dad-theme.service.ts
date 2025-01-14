import { Injectable } from '@angular/core';
import { MaterialCssVarsService } from "angular-material-css-vars";
import { DadAppService } from '../dad-app.service';
import { ReplaySubject, combineLatestWith, map, tap } from 'rxjs';
import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import { DadCacheService } from '../cache/dad-cache.service';
import { IDadThemeConfig } from './dad-theme-config.interface';
extend([harmoniesPlugin]);

@Injectable({
  providedIn: 'root'
})
export class DadThemeService {
  THEME_COLOR_CACHE_KEY = 'THEME-COLOR'
  private setColor = new ReplaySubject<string | null>(1)
  SetColor = (color: string | null) => {
    this.setColor.next(color)
  }
  private initConfig = new ReplaySubject<IDadThemeConfig>(1)
  Theme = this.initConfig.pipe(
    combineLatestWith(this.setColor),
    map(([cnf, c]) => colord(c ?? cnf.Color ?? '0F0')),
    tap((color)=>{
      this.css.setDarkTheme(color.isLight())
      this.css.setPrimaryColor(color.toRgbString())
      this.css.setAccentColor(color.harmonies('complementary')[1].toRgbString())
    })
  )
  LoadInitConfig = (themeConfig: IDadThemeConfig) => this.initConfig.next(themeConfig)
  constructor(private cache: DadCacheService, private app: DadAppService, private css: MaterialCssVarsService) {
    this.setColor.next(this.cache.Get<string>(this.THEME_COLOR_CACHE_KEY)?.Data ?? null)
    this.Theme.subscribe()
  }
}
