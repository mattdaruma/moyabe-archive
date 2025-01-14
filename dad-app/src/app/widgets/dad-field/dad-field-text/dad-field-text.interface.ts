import { FormControl } from "@angular/forms"
import { DadStyle } from "../../dad-style.interface"
import { IDadField } from "../dad-field.interface"

export interface IDadFieldText extends IDadField{
    Type: 'field-text'
    Appearance?: 'fill' | 'outline'
    Label?: string
    DataList?: DataListItem[]
    Disabled?: boolean
}
export interface DataListItem{
    Value?: string
    Display?: string
}