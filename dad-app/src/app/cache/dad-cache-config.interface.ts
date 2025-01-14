import { IDadCacheConfigBase } from "./dad-cache-config-base.interface"

//eventually make all these work for custom user cache settings, but provide a server path to force refresh all
export interface IDadCacheConfig extends IDadCacheConfigBase{
    DateFormat?: string
    TimeFormat?: string
    DefaultRefreshMs?: number | null
    DefaultRefreshPagesMs?: number | null
    DefaultRefreshPageMs?: {[prop: string]: number | null}
    DefaultRefreshWidgetsMs?: number | null
    DefaultRefreshWidgetMs?: {[prop: string]: number | null}
    ClearBeforeUnix?: number
    ClearBeforePagesUnix?: number
    ClearBeforePageUnix?: {[prop: string]: number}
    ClearBeforeWidgetsUnix?: number 
    ClearBeforeWidgetUnix?: {[prop: string]: number}
}