import { IDadCacheConfigBase } from "../cache/dad-cache-config-base.interface";
import { IDadCacheConfig } from "../cache/dad-cache-config.interface";
import { IDadAppConfig } from "../dad-app-config.interface";
import { IDadRoute } from "../routes/dad-route.interface";
import { IDadThemeConfig } from "../theme/dad-theme-config.interface";

export interface IDadConfig extends IDadCacheConfigBase{
    ForceRefreshCacheUnix?: number
    CacheConfigUrl?: string
    CacheConfig?: IDadCacheConfig
    AppConfigUrl?: string
    App?: IDadAppConfig
    RoutesUrl?: string
    Routes?: IDadRoute[]
    ThemeConfigUrl?: string
    Theme?: IDadThemeConfig
}