import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SettingsColorsComponent } from './settings-colors/settings-colors.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { DadAppService } from '../dad-app.service';
import { DadCacheService } from '../cache/dad-cache.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, SettingsColorsComponent, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
      transition(":leave", [style({ position: 'absolute', width: '100%' }), animate(300, style({ opacity: 0 }))])
    ])]
})
export class SettingsComponent implements AfterViewInit {
  location = location
  get Now(){return new Date().getTime()}
  @HostBinding('@fadeInOut') public fadeInOut = true;
  constructor(public app: DadAppService, public cache: DadCacheService) { }
  ngAfterViewInit(): void {
    let page = document.getElementById('settings-container')
    if (!page?.classList.contains('dad-fade-show')) page?.classList.add('dad-fade-show')
  }
}
