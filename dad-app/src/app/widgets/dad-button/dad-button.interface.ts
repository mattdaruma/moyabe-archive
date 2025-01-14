import { IDadWidget } from "../dad-widget.interface";

export interface DadButton extends IDadWidget {
    Color?: string
    Icon?: string
    Text?: string
    RouterLink?: string[]
    HREF?: string
}