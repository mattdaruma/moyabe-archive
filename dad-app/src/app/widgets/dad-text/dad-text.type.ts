import { IDadWidget } from "../dad-widget.interface"

export interface DadText extends IDadWidget {
    Type: 'text'
    Text?: string
}