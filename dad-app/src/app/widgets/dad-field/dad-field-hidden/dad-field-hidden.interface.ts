import { FormControl } from "@angular/forms"
import { DadStyle } from "../../dad-style.interface"
import { DadField } from "../dad-field.interface"

export interface DadFieldHidden extends DadField {
    Type: 'field-hidden'
}