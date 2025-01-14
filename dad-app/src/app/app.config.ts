import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { ExtraOptions, provideRouter, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { progressInterceptor } from './system/progress.interceptor';
import { oauthInterceptor } from './system/oauth.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DadInitializerService } from './initializer/dad-initializer.service';
import { DadCacheService } from './cache/dad-cache.service';
import { provideMaterialCssVars } from 'angular-material-css-vars';
import { DENV } from '../environments/dad-environment.class';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([progressInterceptor, oauthInterceptor])
    ),
    provideRouter(DENV.InitialRoutes ?? [], withRouterConfig(DENV.RouterOptions ?? {})),
    provideNativeDateAdapter(),
    provideMaterialCssVars(DENV.MaterialCssVariablesConfig ?? {}),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: (init: DadInitializerService) => {
        return () => init.LoadDadConfig()
      },
      multi: true,
      deps: [DadInitializerService, DadCacheService]
    }
  ]
};

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