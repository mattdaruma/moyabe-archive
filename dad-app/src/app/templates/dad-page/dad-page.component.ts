import { Component, HostBinding } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, concatAll, catchError, tap, debounceTime, shareReplay, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DadWidgetComponent } from '../../widgets/dad-widget.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TestOuterComponent } from '../../widgets/test-outer/test-outer.component';
import { transition, style, animate, trigger } from '@angular/animations';
import { DadPageService } from '../dad-page.service';
import { DadWidget } from '../../widgets/dad-widget.class';
import { IDadWidget } from '../../widgets/dad-widget.interface';
import { MatIconModule } from '@angular/material/icon';
import { DadCacheService } from '../../cache/dad-cache.service';

@Component({
  selector: 'app-dad-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, DadWidgetComponent, TestOuterComponent, MatIconModule],
  templateUrl: './dad-page.component.html',
  styleUrl: './dad-page.component.scss',
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
      transition(":leave", [style({ position: 'absolute', width: '100%', zIndex: '-1' }), animate(300, style({ opacity: 0 }))])
    ])]
})
export class DadPageComponent {
  JSON = JSON
  @HostBinding('@fadeInOut') public fadeInOut = true
  Error: string | undefined = undefined
  WidgetCount = 0
  ReadyCount = 0
  LastDownload: number | undefined = undefined
  Widget = this.route.data.pipe(
    map(d => {
      let cache = this.cache.Get<IDadWidget>(d['DataUrl'])
      if (!cache)
        return this.http.get<IDadWidget>(d['DataUrl'])
          .pipe(
            tap(data => {
              this.LastDownload = (new Date()).getTime()
              this.cache.Save(`PAGE-${d['DataUrl']}`, data)
            }),
            catchError((err: HttpErrorResponse) => {
              this.Error = JSON.stringify(err, null, 4)
                .replace(/\<\/*pre\>/, ' ')
                .replace(/\n+/g, '\n')
                .replace(/(\\n)+/g, '');
              throw (err)
            })
          )
      this.LastDownload = cache.CreatedUnix
      return of(cache.Data)
    }),
    debounceTime(0),
    concatAll(),
    map(data => {
      return new DadWidget(data)
    }),
    tap(w => {
      this.WidgetCount = 0
      this.ReadyCount = 0
      if (w) for (let fieldId in w.Dictionary) {
        
        if(w.Dictionary[fieldId].Form) w.Dictionary[fieldId].Form?.valueChanges.subscribe(v => console.warn('page valuee change', v))

        this.WidgetCount++
        w.Dictionary[fieldId].Ready.subscribe(() => {
          this.ReadyCount++
        })
      }
    }),
    shareReplay(1)
  )
  constructor(public http: HttpClient, private route: ActivatedRoute, private page: DadPageService, private cache: DadCacheService) {  }
}

export interface DadPageCache {
  LastDownload: number
  Data: IDadWidget
}