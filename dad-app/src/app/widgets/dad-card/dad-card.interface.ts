import { IDadWidget } from "../dad-widget.interface"

export interface DadCard extends IDadWidget{
    Type: 'card'
}

export interface DadCardImage extends IDadWidget{
    Type: 'card-image'
    URL?: string
    Title?: string
}

export interface DadCardHeader extends IDadWidget{
    Type: 'card-head'
    Title?: string
    Subtitle?: string
    Avatar?: DadCardImage
}

export interface DadCardActions extends IDadWidget {
    Type: 'card-actions'
    Children?: DadCardAction[]
}

export interface DadCardAction extends IDadWidget {
    Type: 'card-action'
    Icon?: string
    Display?: string
    Color?: string
    RouterLink?: string[]
    HREF?: string
}

export interface DadCardContent extends IDadWidget {
    Type: 'card-content'
}

export interface DadCardFooter extends IDadWidget {
    Type: 'card-footer'
    Text?: string
}