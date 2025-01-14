import { Component } from '@angular/core';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-chart',
  standalone: true,
  imports: [],
  templateUrl: './dad-chart.component.html',
  styleUrl: './dad-chart.component.scss'
})
export class DadChartComponent extends WidgetComponentBase {
  WidgetReady = this.BaseReady.subscribe(w => {
    w.MarkReady()
  })
}
