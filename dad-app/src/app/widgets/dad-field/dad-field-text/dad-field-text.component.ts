import { Component, Input } from '@angular/core';
import { IDadFieldText } from './dad-field-text.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WidgetComponentBase } from '../../dad-widget.component.base';
import { first } from 'rxjs';

@Component({
  selector: 'app-dad-field-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dad-field-text.component.html',
  styleUrl: './dad-field-text.component.scss'
})
export class DadFieldTextComponent extends WidgetComponentBase{
  JSON = JSON
  Object = Object
  constructor(){
    super()
    this.Widget.pipe(first()).subscribe(w => {
      w.Data.Disabled === true ? w.Field?.disable() : w.Field?.enable()
      w.MarkReady()
    })
  }
}
