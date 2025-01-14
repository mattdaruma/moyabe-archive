import { Component } from '@angular/core';
import { WidgetComponentBase } from '../dad-widget.component.base';

@Component({
  selector: 'app-dad-editor',
  standalone: true,
  imports: [],
  templateUrl: './dad-editor.component.html',
  styleUrl: './dad-editor.component.scss'
})
export class DadEditorComponent extends WidgetComponentBase {
}
