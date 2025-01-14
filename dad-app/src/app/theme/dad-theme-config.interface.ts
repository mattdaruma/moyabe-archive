import { IDadCacheConfigBase } from "../cache/dad-cache-config-base.interface"

export interface IDadThemeConfig extends IDadCacheConfigBase{
    Color?: string
    AccentColor?: string
    WarnColor?: string
    Font?: string
    IsDark?: boolean
}