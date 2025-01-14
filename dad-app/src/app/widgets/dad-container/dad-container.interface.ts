import { IDadWidget } from "../dad-widget.interface";

export interface DadContainer extends IDadWidget{
    Type: 'container'
}

export interface DadContainerItem extends IDadWidget{
    Type: 'container-item'
}