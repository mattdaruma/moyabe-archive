import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-button',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './dad-button.component.html',
  styleUrl: './dad-button.component.scss'
})
export class DadButtonComponent extends WidgetComponentBase {
  StyledWidget = this.Widget.pipe(map(w => {
    w.Color = w.Color ?? 'primary'
    return w
  }))
  WidgetReady = this.BaseReady.subscribe(w => w.MarkReady())
}
