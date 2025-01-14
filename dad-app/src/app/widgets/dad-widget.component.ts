import { Component, Input } from '@angular/core';
import { DadBannerComponent } from './dad-banner/dad-banner.component';
import { DadCardComponent } from './dad-card/dad-card.component';
import { DadChartComponent } from './dad-chart/dad-chart.component';
import { DadEditorComponent } from './dad-editor/dad-editor.component';
import { DadFormComponent } from './dad-form/dad-form.component';
import { DadTableComponent } from './dad-table/dad-table.component';
import { DadViewComponent } from './dad-view/dad-view.component';
import { CommonModule } from '@angular/common';
import { DadContainerComponent } from './dad-container/dad-container.component';
import { DadFieldComponent } from './dad-field/dad-field.component';
import { DadTextComponent } from './dad-text/dad-text.component';
import { DadWidget } from './dad-widget.class';

@Component({
  selector: 'app-dad-widget',
  standalone: true,
  imports: [CommonModule, DadContainerComponent, DadBannerComponent, DadCardComponent, DadChartComponent, DadTextComponent,
    DadEditorComponent, DadFormComponent, DadFieldComponent, DadTableComponent, DadViewComponent],
  templateUrl: './dad-widget.component.html',
  styleUrl: './dad-widget.component.scss'
})
export class DadWidgetComponent {
  @Input() Widget: DadWidget | null = null
}
