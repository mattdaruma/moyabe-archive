import { DadImage } from "../dad-image/dad-image.interface";
import { IDadWidget } from "../dad-widget.interface";

export interface DadBanner extends IDadWidget {
    Type: 'banner',
    Image: DadImage
}