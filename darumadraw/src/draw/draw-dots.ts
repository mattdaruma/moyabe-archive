import { NodeCanvasRenderingContext2D } from "canvas";
import { DarumaColors } from "../color-calculator";
import { CANVASSIZE, DarumaCanvas } from "../daruma-canvas";



const drawDots = (canvas: DarumaCanvas) => {
    canvas.context.fillStyle = canvas.colors.accentColor
    canvas.context.beginPath()
    canvas.context.arc(CANVASSIZE*.36, CANVASSIZE*.69, CANVASSIZE*.03, 0, 2*Math.PI)
    canvas.context.fill()
    canvas.context.beginPath()
    canvas.context.arc(CANVASSIZE*.5, CANVASSIZE*.69, CANVASSIZE*.03, 0, 2*Math.PI)
    canvas.context.fill()
    canvas.context.beginPath()
    canvas.context.arc(CANVASSIZE*.63, CANVASSIZE*.69, CANVASSIZE*.03, 0, 2*Math.PI)
    canvas.context.fill()
}

export { drawDots }