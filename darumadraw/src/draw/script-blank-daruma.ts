import { CANVASSIZE } from "../canvas-size";
import { DarumaCanvas } from "../daruma-canvas";
import { drawBody } from "./draw-body";
import { drawDots } from "./draw-dots";
import { drawFace } from "./draw-face";



const drawBlankDaruma = (canvas: DarumaCanvas, rotate: number = 0, offx: number = 0, offy: number = 0) => {
    canvas.context.clearRect(0, 0, CANVASSIZE, CANVASSIZE)
    canvas.context.resetTransform()
    canvas.context.translate(offx, 0)
    canvas.context.translate(CANVASSIZE/2, CANVASSIZE/2)
    canvas.context.rotate(rotate)
    canvas.context.translate(-CANVASSIZE/2, -CANVASSIZE/2)
    drawBody(canvas)
    drawFace(canvas)
    drawDots(canvas)
}

export { drawBlankDaruma }