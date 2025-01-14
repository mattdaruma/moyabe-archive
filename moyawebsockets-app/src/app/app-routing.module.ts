import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from './auth/is-auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'moyabe-blog'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'moya-web', loadChildren: () => import('./moya-web/moya-web.module').then(m => m.MoyaWebModule), canLoad: [IsAuthGuard]},
  {path: 'moyabe-blog', loadChildren: () => import('./moyabe-blog/moyabe-blog.module').then(m => m.MoyabeBlogModule)},
  {path: '**', redirectTo: 'moyabe-blog'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 