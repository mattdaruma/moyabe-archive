import { Component, forwardRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DadWidgetComponent } from '../dad-widget.component';
import { WidgetComponentBase } from '../dad-widget.component.base';
import { first } from 'rxjs';

@Component({
  selector: 'app-dad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, forwardRef(()=> DadWidgetComponent)],
  templateUrl: './dad-form.component.html',
  styleUrl: './dad-form.component.scss'
})
export class DadFormComponent extends WidgetComponentBase {
  constructor(){
    super()
    this.Widget.pipe(first()).subscribe(w => {
      for(let fieldId of w.Data.Form ?? []){
          let field = w.Root?.Dictionary[fieldId]
          if(!field || !field.Data?.Key || !field.Field) {
              console.error('Invalid Field on Form', w.Id, fieldId)
              continue
          }
          w.Form!.registerControl(field.Data.Key, field.Field)
      } 
      w.MarkReady()
    })
  }
  OnSubmit(){
    console.warn('FORM SUBMITTED')
  }
}