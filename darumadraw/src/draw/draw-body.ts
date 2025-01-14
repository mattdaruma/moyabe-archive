import { NodeCanvasRenderingContext2D } from "canvas";
import { DarumaColors } from "../color-calculator";
import { CANVASSIZE, DarumaCanvas } from "../daruma-canvas";



const drawBody = (canvas: DarumaCanvas) => {
    canvas.context.fillStyle = canvas.colors.bodyColor
    canvas.context.beginPath()
    canvas.context.arc(CANVASSIZE*.5, CANVASSIZE*.5, CANVASSIZE*.3, 0, 2*Math.PI)
    canvas.context.fill()
}

export { drawBody }