import { IDadWidget } from "../dad-widget.interface"

export interface DadView extends IDadWidget{
    Type: 'view'
    HTML: string
}