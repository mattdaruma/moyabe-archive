import { Injectable } from '@angular/core';
import { ReplaySubject, combineLatestWith, first, map, startWith } from 'rxjs';
import { IDadRoute } from './dad-route.interface';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DadRoutesService {
  private initRoutes = new ReplaySubject<IDadRoute[]>(1)
  private pageRoutes = new ReplaySubject<IDadRoute[]>(1)
  private userRoutes = new ReplaySubject<IDadRoute[]>(1)
  RouteConfig$ = this.initRoutes.pipe(
    combineLatestWith(this.pageRoutes.pipe(startWith([] as IDadRoute[]))),
    map(([routes, page]) => {
      for(let i = page.length - 1; i > -1; i--) routes.unshift(page[i])
      return routes
    }),
    combineLatestWith(this.userRoutes.pipe(startWith([] as IDadRoute[]))),
    map(([routes, user]) => {
      for(let i = user.length - 1; i > -1; i--) routes.unshift(user[i])
      return routes
    }),
    map(routes => {
      let angularRoutes: Route[] = []
      for (let route of routes) {
        let newRoute: Route = { path: route.Path }
        if (newRoute.path == '') newRoute.pathMatch = 'full'
        if (!route.Template || route.Template == 'dad-page') {
          newRoute.loadComponent = () => import('../templates/dad-page/dad-page.component').then(m => m.DadPageComponent)
        } else {
          newRoute.loadComponent = () => import('../errors/no-template/no-template.component').then(m => m.NoTemplateComponent)
          newRoute.data = route
        }
        newRoute.data = route
        angularRoutes.push(newRoute)
      }
      angularRoutes.push({
        path: '⚙',
        loadComponent: () => import('../settings/settings.component').then(m => m.SettingsComponent)
      })
      angularRoutes.push({
        path: '**',
        loadComponent: () => import('../errors/not-found/not-found.component').then(m => m.NotFoundComponent),
      })
      if(angularRoutes.length > 0) this.router.resetConfig(angularRoutes)
      return routes
    })
  )
  constructor(private router: Router) { }
  LoadInitConfig(initRoutes: IDadRoute[] = []){
    let configReady = this.RouteConfig$.pipe(first(), map(()=>true))
    this.initRoutes.next(initRoutes)
    return configReady
  }
  SetPageRoutes = (pageRoutes: IDadRoute[] = []) => this.pageRoutes.next(pageRoutes)
  SetUserRoutes = (userRoutes: IDadRoute[] = []) => this.userRoutes.next(userRoutes)
}
