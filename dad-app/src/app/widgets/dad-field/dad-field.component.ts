import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadFieldAutocompleteComponent } from './dad-field-autocomplete/dad-field-autocomplete.component';
import { DadFieldCheckboxComponent } from './dad-field-checkbox/dad-field-checkbox.component';
import { DadFieldColorComponent } from './dad-field-color/dad-field-color.component';
import { DadFieldDateComponent } from './dad-field-date/dad-field-date.component';
import { DadFieldFileComponent } from './dad-field-file/dad-field-file.component';
import { DadFieldHiddenComponent } from './dad-field-hidden/dad-field-hidden.component';
import { DadFieldNumberComponent } from './dad-field-number/dad-field-number.component';
import { DadFieldPasswordComponent } from './dad-field-password/dad-field-password.component';
import { DadFieldRadioComponent } from './dad-field-radio/dad-field-radio.component';
import { DadFieldRangeComponent } from './dad-field-range/dad-field-range.component';
import { DadFieldSelectComponent } from './dad-field-select/dad-field-select.component';
import { DadFieldTextComponent } from './dad-field-text/dad-field-text.component';
import { WidgetComponentBase } from '../dad-widget.component.base';
import { first } from 'rxjs';
import { PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-dad-field',
  standalone: true,
  imports: [CommonModule, DadFieldAutocompleteComponent, DadFieldCheckboxComponent, DadFieldColorComponent,
    DadFieldDateComponent, DadFieldFileComponent, DadFieldHiddenComponent, DadFieldNumberComponent,
    DadFieldPasswordComponent, DadFieldRadioComponent, DadFieldRangeComponent, DadFieldSelectComponent,
    DadFieldTextComponent],
  templateUrl: './dad-field.component.html',
  styleUrl: './dad-field.component.scss'
})
export class DadFieldComponent extends WidgetComponentBase {
  constructor() {
    super()
    this.Widget.pipe(first()).subscribe(w => {
      let validators = []
      for(let v of w.Data?.Validators ?? []){
        console.warn('VAL', v)
        if(v.Type === 'minLength') validators.push(Validators.minLength(v.Min ?? 0))
        else if(v.Type === 'maxLength') validators.push(Validators.maxLength(v.Max ?? 0))
        else if(v.Type === 'min') validators.push(Validators.min(v.Min ?? 0))
        else if(v.Type === 'max') validators.push(Validators.max(v.Max ?? 0))
        else if(v.Type === 'pattern') validators.push(Validators.pattern(v.Pattern ?? ''))
        else if(v.Type === 'required') validators.push(Validators.required)
        else if(v.Type === 'requiredTrue') validators.push(Validators.requiredTrue)
        else if(v.Type === 'email') validators.push(Validators.email)
        else if(v.Type === 'nullValidator') validators.push(Validators.nullValidator)
      }
      console.warn('VALIDATORS', validators)
      w.Field?.addValidators(validators)
    })
  }
}
