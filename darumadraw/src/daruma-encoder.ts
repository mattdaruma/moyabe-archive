import { CANVASSIZE } from "./canvas-size"
import { DarumaCanvas } from "./daruma-canvas"

const GIFEncoder = require('gif-encoder-2')
class DarumaEncoder{
    darumaCanvas: DarumaCanvas
    constructor(darumaCanvas: DarumaCanvas){
        this.darumaCanvas = darumaCanvas
    }
    getEncoder(){
        let encoder = new GIFEncoder(CANVASSIZE, CANVASSIZE)
        encoder.setTransparent(this.darumaCanvas.colors.backgroundColor)
        encoder.setDelay(500)
        return encoder
    }
}
export { DarumaEncoder }