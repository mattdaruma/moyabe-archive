import { NodeCanvasRenderingContext2D } from "canvas";
import { DarumaColors } from "../color-calculator";
import { CANVASSIZE, DarumaCanvas } from "../daruma-canvas";

const drawMouth = (darumaCanvas: DarumaCanvas, curve: number = 0, open: number = 0) => {
    darumaCanvas.context.fillStyle = darumaCanvas.colors.outlineColor
    let qpi = Math.PI/4
    if(curve === 0 || curve < -1 || curve > 1) curve = .1
    if(open < 0 || open > 1) open = 0
    let fullHeight = CANVASSIZE*.07
    let height = Math.abs(curve*fullHeight)
    let startR = 0
    let endR = 4*qpi
    let startRSpeak = 2*qpi - open*4*qpi 
    let endRSpeak = 2*qpi + open*4*qpi
    let speakHeight = open*fullHeight
    if(speakHeight > height) height = speakHeight
    if(curve < 0){
        endR = [startR, startR=endR][0]
        endRSpeak = [-startRSpeak, startRSpeak=-endRSpeak][0]
    }
    darumaCanvas.context.beginPath()
    darumaCanvas.context.ellipse(CANVASSIZE*.5, CANVASSIZE*.53, CANVASSIZE*.1, height, 0, startR, endR)
    darumaCanvas.context.stroke()
    darumaCanvas.context.beginPath()
    darumaCanvas.context.ellipse(CANVASSIZE*.5, CANVASSIZE*.53, CANVASSIZE*.1, height, 0, startRSpeak, endRSpeak)
    darumaCanvas.context.fill()
    darumaCanvas.context.stroke()
}

export { drawMouth }