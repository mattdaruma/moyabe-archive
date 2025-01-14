import { Component } from '@angular/core';
import { WidgetComponentBase } from '../dad-widget.component.base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dad-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dad-text.component.html',
  styleUrl: './dad-text.component.scss'
})
export class DadTextComponent extends WidgetComponentBase {
}
