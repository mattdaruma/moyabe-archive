import { Route, RouterConfigOptions } from "@angular/router"
import { IDadConfig } from "../app/initializer/dad-config.interface"
import { MaterialCssVariablesConfig } from "angular-material-css-vars"


export abstract class DENV {
    //Make sure this is unique for every deployment, especially if sharing a domain with another DAD APP.
    public static CACHE_UNIQUE_KEY? = 'DAD-CACHE'
    public static CONFIG_CACHE_LIFETIME_MS? = 0
    public static CONFIG_CACHE_REFRESH_UNIX?: number = undefined
    public static CONFIG_URL? = '/assets/dad-config.json'
    public static Config?: IDadConfig = {}
    public static InitialRoutes?: Route[] = []
    public static RouterOptions?: RouterConfigOptions = {}
    public static MaterialCssVariablesConfig? = {
      primary: '#3f51b5'
    } as Partial<MaterialCssVariablesConfig>
  }
  