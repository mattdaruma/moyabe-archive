import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadWidgetComponent } from '../dad-widget.component';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-container',
  standalone: true,
  imports: [CommonModule, forwardRef(() => DadWidgetComponent)],
  templateUrl: './dad-container.component.html',
  styleUrl: './dad-container.component.scss'
})
export class DadContainerComponent extends WidgetComponentBase {
  WidgetReady = this.BaseReady.subscribe(w => {
    for(let c of w.Children) c.MarkReady()
    w.MarkReady()
  })
  constructor(){super()}
}
