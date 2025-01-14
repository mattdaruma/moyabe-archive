import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { debounceTime, map, startWith, tap } from 'rxjs';
import { ProgressService } from './system/progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DadAppService } from './dad-app.service';
import { ConfigService } from './settings/config.service';
import { DadCacheService } from './cache/dad-cache.service';
import { DadThemeService } from './theme/dad-theme.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatMenuModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dadAppContainer') App: ElementRef | undefined = undefined
  AppConfig = this.app.AppConfig.pipe(tap(config => {
    document.getElementById('dad-favicon')?.setAttribute('href', config.Favicon ?? '/assets/dad-favicon.ico');
  }))
  PendingRequests = this.progress.PendingRequests.pipe(
    map(r => r > 0 ? true : false),
    debounceTime(0),
    startWith(false)
  )
  constructor(public config: ConfigService, public progress: ProgressService, private app: DadAppService, 
    public cache: DadCacheService, private theme: DadThemeService) {
  }
  ngAfterViewInit(): void {
    let loader = document.getElementById('loader-container')!
    loader.classList.remove('dad-fade-show')
    setTimeout(() => this.App?.nativeElement.classList.add('dad-fade-show'), 0)
    setTimeout(() => loader.remove(), 300)
  }
}
