import { FormControl } from "@angular/forms"
import { DadStyle } from "../../dad-style.interface"
import { DadField } from "../dad-field.interface"

export interface DadFieldSelect extends DadField{
    Type: 'field-select'
}