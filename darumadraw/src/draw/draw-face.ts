import { NodeCanvasRenderingContext2D } from "canvas";
import { DarumaColors } from "../color-calculator";
import { CANVASSIZE, DarumaCanvas } from "../daruma-canvas";



const drawFace = (canvas: DarumaCanvas) => {
    canvas.context.fillStyle = canvas.colors.faceColor
    canvas.context.beginPath()
    canvas.context.arc(CANVASSIZE*.5, CANVASSIZE*.5, CANVASSIZE*.25, Math.PI - .5, 2*Math.PI+.5)
    canvas.context.closePath()
    canvas.context.fill()
}

export { drawFace }