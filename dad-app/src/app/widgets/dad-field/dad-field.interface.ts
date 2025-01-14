import { FormControl } from "@angular/forms";
import { IDadWidget } from "../dad-widget.interface";

export interface IDadField extends IDadWidget {
   Control?: FormControl
   Key: string
   Value?: string
}
