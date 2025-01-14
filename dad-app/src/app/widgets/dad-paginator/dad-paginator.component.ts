import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-dad-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './dad-paginator.component.html',
  styleUrl: './dad-paginator.component.scss'
})
export class DadPaginatorComponent {

}
