import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DadWidgetComponent } from '../dad-widget.component';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatCardModule, MatButtonModule, forwardRef(() => DadWidgetComponent)],
  templateUrl: './dad-card.component.html',
  styleUrl: './dad-card.component.scss'
})
export class DadCardComponent extends WidgetComponentBase {
  WidgetReady = this.BaseReady.subscribe(w => {
    for(let c of w.Children) {
      if(c.Type === 'card-head') for(let h of c.Children) h.MarkReady()
      c.MarkReady()
    }
    w.MarkReady()
  })
}
