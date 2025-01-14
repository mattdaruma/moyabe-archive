import { Component, forwardRef } from '@angular/core';
import { DadWidgetComponent } from '../dad-widget.component';
import { CommonModule } from '@angular/common';
import { Subject, first, forkJoin, map } from 'rxjs';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-banner',
  standalone: true,
  imports: [CommonModule, forwardRef(() => DadWidgetComponent)],
  templateUrl: './dad-banner.component.html',
  styleUrl: './dad-banner.component.scss'
})
export class DadBannerComponent extends WidgetComponentBase {
  StyledWidget = this.Widget.pipe(map(w => {
    w.Data.Style = Object.assign(w.Data?.Style ?? {}, {
      backgroundImage: w.Data?.Style?.backgroundImage ? w.Data.Style.backgroundImage : `url('${w.Data?.URL}')`,
      height: w.Data?.Style?.height ? w.Data.Style.height : '30em'
    })
    return w
  }))
  private imageReady = new Subject<string>()
  WidgetReady = forkJoin([
    this.BaseReady,
    this.imageReady.pipe(first())
  ]).subscribe(([w, i]) => w.MarkReady())
  ImageLoaded = () => {
    this.imageReady.next('success')
  }
  ImageError = () => {
    this.imageReady.next('error')
  }
}
