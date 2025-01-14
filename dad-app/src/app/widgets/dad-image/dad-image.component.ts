import { AfterViewInit, Component, Input } from '@angular/core';
import { DadTable } from '../dad-table/dad-table.interface';

@Component({
  selector: 'app-dad-image',
  standalone: true,
  imports: [],
  templateUrl: './dad-image.component.html',
  styleUrl: './dad-image.component.scss'
})
export class DadImageComponent implements AfterViewInit {
  @Input() Table: DadTable | undefined = undefined
  ngAfterViewInit(): void {
    this.Table?.Loaded?.next(this.Table.Type)
  }
}
