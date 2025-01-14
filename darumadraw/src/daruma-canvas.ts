import { createCanvas, Canvas, NodeCanvasRenderingContext2D } from 'canvas'
import { CANVASSIZE } from './canvas-size'
import { DarumaColors } from './color-calculator'
const STROKEWIDTH = 3
class DarumaCanvas {
    colors: DarumaColors = {
        faceColor: '#ddd',
        bodyColor: '#f00',
        backgroundColor: '#000',
        accentColor: '#0ff',
        outlineColor: '#222'
    }
    canvas: Canvas
    context: NodeCanvasRenderingContext2D
    constructor(){
        this.canvas = createCanvas(CANVASSIZE, CANVASSIZE)
        this.context = this.canvas.getContext('2d')
        this.context.lineWidth = STROKEWIDTH
        this.context.strokeStyle = this.colors.outlineColor
        this.context.save()
    }
    setColor(colors: DarumaColors){
        this.colors =colors
        this.context.strokeStyle = colors.outlineColor
    }
}
export { DarumaCanvas, CANVASSIZE }