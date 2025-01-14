import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, forkJoin, of, timeout } from 'rxjs';
import { Route, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { colord } from "colord";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  Icon: string = 'person'
  Title: string = 'DEFAULT TITLE'
  Nav: DadNav[] = []
  constructor(private http: HttpClient, private router: Router, private readonly title: Title) {  
   }
  load() {
      this.http.get<DadConfig>('/assets/dad-config.json').pipe(
        catchError(err => {throw err }),
      ).subscribe( configs => {
      this.Icon = configs.Icon
      this.Title = configs.Title
      this.Nav = configs.Nav
      this.title.setTitle(configs.Title)
      document.getElementById('dad-favicon')?.setAttribute('href', '/assets/dad-favicon.ico');
      let appRoutes: Route[] = []
      for (let route of configs.Routes) {
        let newRoute: Route = { path: route.Path }
        if (newRoute.path == '') newRoute.pathMatch = 'full'
        if (!route.Template || route.Template == 'dad-page') {
          newRoute.loadComponent = () => import('../templates/dad-page/dad-page.component').then(m => m.DadPageComponent)
        } else {
          newRoute.loadComponent = () => import('../errors/no-template/no-template.component').then(m => m.NoTemplateComponent)
          newRoute.data = route
        }
        newRoute.data = route
        appRoutes.push(newRoute)
      }
      appRoutes.push({
        path: '⚙',
        loadComponent: () => import('./settings.component').then(m => m.SettingsComponent)
      })
      appRoutes.push({
        path: '**',
        loadComponent: () => import('../errors/not-found/not-found.component').then(m => m.NotFoundComponent),
      })
      this.router.resetConfig(appRoutes)
      console.log('🤠 Routes Loaded.  Welcome to DAD-APP!')
      if(configs.Color) this.SeedColor(configs.Color)
      //this.StartRave()
      return true
    })
  }

  private lightPrimaryText = 'rgba(255, 255, 255, 1)'
  private darkPrimaryText = 'rgba(0, 0, 0, .87)'
  private primary = colord('rgba(25, 25, 25, 1)')
  private raveInterval: any
  private redUp: boolean = false;
  private greenUp: boolean = false;
  private blueUp: boolean = false;
  private raveTurn: number = 1;
  private raveIntervalMilliseconds: number = 30
  private raveStepSize = 5
  // light max threshold: 126
  private raveMaxSize = 125
  // dark min threshold: 150
  private raveMinSize = 25
  private raveColor: 'red' | 'green' | 'blue' = 'red'
  StartRave() {
    this.raveInterval = setInterval(() => {
      if (this.raveTurn % (this.raveColor == 'red' ? 4 : this.raveColor == 'green' ? 2 : 1) == 0) {
        if (this.redUp) this.primary.rgba.r += this.raveStepSize
        else this.primary.rgba.r -= this.raveStepSize
        if (this.primary.rgba.r >= this.raveMaxSize) {
          this.primary.rgba.r = this.raveMaxSize
          this.redUp = false
        }
        if (this.primary.rgba.r <= this.raveMinSize) {
          this.primary.rgba.r = this.raveMinSize
          this.redUp = true
        }
      }
      if (this.raveTurn % (this.raveColor == 'green' ? 4 : this.raveColor == 'blue' ? 2 : 1) == 0) {
        if (this.greenUp) this.primary.rgba.g += this.raveStepSize
        else this.primary.rgba.g -= this.raveStepSize
        if (this.primary.rgba.g >= this.raveMaxSize) {
          this.primary.rgba.g = this.raveMaxSize
          this.greenUp = false
        }
        if (this.primary.rgba.g <= this.raveMinSize) {
          this.primary.rgba.g = this.raveMinSize
          this.greenUp = true
        }
      }
      if (this.raveTurn % (this.raveColor == 'blue' ? 4 : this.raveColor == 'red' ? 2 : 1) == 0) {
        if (this.blueUp) this.primary.rgba.b += this.raveStepSize
        else this.primary.rgba.b -= this.raveStepSize
        if (this.primary.rgba.b >= this.raveMaxSize) {
          this.primary.rgba.b = this.raveMaxSize
          this.blueUp = false
        }
        if (this.primary.rgba.b <= this.raveMinSize) {
          this.primary.rgba.b = this.raveMinSize
          this.blueUp = true
        }
      }
      this.raveTurn++
      if(this.raveTurn > (((this.raveMaxSize - this.raveMinSize)/this.raveStepSize)*2)){
        let originalColor = JSON.parse(JSON.stringify(this.raveColor))
        if(originalColor == 'red') this.raveColor = 'green'
        else if(originalColor == 'green') this.raveColor = 'blue'
        else this.raveColor = 'red'
        this.raveTurn = 1
      }
      let rgbtext = `rgba(${this.primary.rgba.r}, ${this.primary.rgba.g}, ${this.primary.rgba.b}, 1)`
      this.SeedColor(rgbtext)
    }, this.raveIntervalMilliseconds)
  }
  StopRave() {
    clearInterval(this.raveInterval)
  }
  SeedColor(rgba: string = `rgba(${this.primary.rgba.r}, ${this.primary.rgba.g}, ${this.primary.rgba.b}, 1)`) {
    let isDark = colord(rgba).isLight()

    let primary = this.primary = colord(rgba)
    let primaryHues = this.computeHues(primary.toRgbString())
    for (let hue of primaryHues) {
      document.documentElement.style.setProperty(`--theme-primary-${hue.hue}`, hue.color.toRgbString())
      if (hue.color.isLight()) {
        document.documentElement.style.setProperty(`--theme-primary-contrast-${hue.hue}`, this.darkPrimaryText)
      } else {
        document.documentElement.style.setProperty(`--theme-primary-contrast-${hue.hue}`, this.lightPrimaryText)
      }
    }
    let accent = colord(`rgba(${primary.rgba.b},${primary.rgba.r},${primary.rgba.g},1)`)
    let accentHues = this.computeHues(accent.toRgbString())
    for (let hue of accentHues) {
      document.documentElement.style.setProperty(`--theme-accent-${hue.hue}`, hue.color.toRgbString())
      if (hue.color.isLight()) {
        document.documentElement.style.setProperty(`--theme-accent-contrast-${hue.hue}`, this.darkPrimaryText)
      } else {
        document.documentElement.style.setProperty(`--theme-accent-contrast-${hue.hue}`, this.lightPrimaryText)
      }
    }
    let warn = colord('#f44336')
    let warnHues = this.computeHues(warn.toRgbString())
    for (let hue of warnHues) {
      document.documentElement.style.setProperty(`--theme-warn-${hue.hue}`, hue.color.toRgbString())
      if (hue.color.isLight()) {
        document.documentElement.style.setProperty(`--theme-warn-contrast-${hue.hue}`, this.darkPrimaryText)
      } else {
        document.documentElement.style.setProperty(`--theme-warn-contrast-${hue.hue}`, this.lightPrimaryText)
      }
    }
    var body = document.getElementsByClassName('mat-app-background')![0]
    if (isDark) {
      if (!body.classList.contains('theme-dark')) {
        body.classList.add("theme-dark")
      }
    } else {
      if (body.classList.contains('theme-dark')) {
        body.classList.remove("theme-dark")
      }
    }
    var bodyStyles = getComputedStyle(body)
    document.documentElement.style.setProperty(`--theme-fuzz`, bodyStyles.backgroundColor)
    let bgColor = colord(bodyStyles.backgroundColor)
    document.documentElement.style.setProperty(`--theme-fuzz-anti`, bgColor.invert().toRgbString())
  }
  private computeHues(rgba: string) {
    return [
      { hue: '50', color: colord(rgba).lighten(52) },
      { hue: '100', color: colord(rgba).lighten(37) },
      { hue: '200', color: colord(rgba).lighten(26) },
      { hue: '300', color: colord(rgba).lighten(12) },
      { hue: '400', color: colord(rgba).lighten(6) },
      { hue: '500', color: colord(rgba) },
      { hue: '600', color: colord(rgba).darken(6) },
      { hue: '700', color: colord(rgba).darken(12) },
      { hue: '800', color: colord(rgba).darken(18) },
      { hue: '900', color: colord(rgba).darken(24) },
      { hue: 'A100', color: colord(rgba).lighten(50).saturate(30) },
      { hue: 'A200', color: colord(rgba).lighten(30).saturate(30) },
      { hue: 'A300', color: colord(rgba).lighten(10).saturate(15) },
      { hue: 'A400', color: colord(rgba).lighten(5).saturate(5) }
    ];
  }
}

export interface DadError {
  Title: string
  Message: string
  Timestamp: Date
  Error: any
}

export interface DadConfig {
  Color: string
  Icon: string
  Title: string
  Nav: DadNav[]
  Routes: DadRoute[]
}

export interface DadNav {
  RouterLink: string
  Icon: string
  Display: string
}

export interface DadRoute {
  Path: string
  Template: string
  DataUrl: string
}