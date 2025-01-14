import { FormControl } from "@angular/forms"
import { IDadWidget } from "../dad-widget.interface"

export interface DadForm extends IDadWidget{
    Type: 'form'
    FormGroup: DadFormGroup
}

export interface DadFormGroup {
    [prop: string]: FormControl
}