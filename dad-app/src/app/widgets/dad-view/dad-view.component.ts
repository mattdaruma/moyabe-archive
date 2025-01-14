import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-view',
  standalone: true,
  imports: [CommonModule, QuillModule],
  templateUrl: './dad-view.component.html',
  styleUrl: './dad-view.component.scss'
})
export class DadViewComponent extends WidgetComponentBase {
  WidgetReady = this.BaseReady.subscribe(w => {
    w.MarkReady()
  })
}
