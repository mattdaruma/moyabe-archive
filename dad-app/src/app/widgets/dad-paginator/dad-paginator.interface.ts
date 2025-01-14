import { IDadWidget } from "../dad-widget.interface";

export interface DadPaginator extends Omit<Omit<Omit<IDadWidget, 'Children'>, 'Paginator'>, 'Filters'>{
    Type: 'paginator'
}

export interface DadPageEvent {
    PageIndex: number
    PageSize: number
    TotalCount: number
}