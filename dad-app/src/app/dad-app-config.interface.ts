import { IDadCacheConfigBase } from "./cache/dad-cache-config-base.interface"

export interface IDadAppConfig extends IDadCacheConfigBase{
    Title?: string
    Icon?: string
    Favicon?: string
    Nav?: IDadNav[]
}

export interface IDadNav {
  RouterLink: string
  Icon: string
  Display: string
}