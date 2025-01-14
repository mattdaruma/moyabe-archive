import { IDadCacheConfigBase } from "../cache/dad-cache-config-base.interface";
import { DadStyle } from "./dad-style.interface";

export interface IDadOption{
  Style?: DadStyle
  Display?: string
  Value: string
}
export interface IDadImage{
  Style?: DadStyle
  Title?: string
  URL?: string
  SVG?: string
}
export interface IDadAction{
  Route?: string[] // paths, no slashes
  Style?: DadStyle
  Icon?: string
  Color?: string
  Text?: string
}
export interface IDadValidator{
  Type: 'min' | 'max' | 'required' | 'requiredTrue' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'nullValidator'
  Min?: number
  Max?: number
  Pattern?: string
}
export interface IDadWidget extends IDadCacheConfigBase {
  Id: string
  Type: string
  Disabled?: boolean
  Style?: DadStyle
  Children?: IDadWidget[]
  Actions?: IDadAction[]
  Avatar?: IDadImage
  Color?: string
  Columns?: any[]
  Data?: any[]
  FormId?: string
  Footer?: string
  Form?: string[] // fieldIds
  Hint?: string
  HTML?: string
  Icon?: string
  Image?: IDadImage
  Key?: string
  Options?: IDadOption[]
  Route?: string[]
  Subtitle?: string
  Text?: string
  Title?: string
  URL?: string
  Value?: string
  FilterId?: string
  PaginatorId?: string
  Validators?: IDadValidator[]
}
