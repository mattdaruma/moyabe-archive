import { CANVASSIZE } from "../canvas-size"
import { DarumaEncoder } from "../daruma-encoder"
import { drawBlankDaruma } from "../draw/script-blank-daruma"
import { drawEyes } from "../draw/draw-eyes"
import { drawMouth } from "../draw/draw-mouth"

const animateRolling = (darumaEncoder: DarumaEncoder, mouthCurve: number = 0, eyeTilt?: number, roll: number = .2)=>{
    if(roll < 0 || roll > 1) roll = 0
    let encoder = darumaEncoder.getEncoder()
    encoder.setDelay(50)
    encoder.start()

    let goingUp = true
    let rollMax = Math.PI*roll
    let rollUnit = rollMax/15
    let rollRot = 0

    let r = darumaEncoder.darumaCanvas.canvas.width*.3
    let rollDistance = 2*Math.PI*r*(roll) / 30
    let xtrans = 0

    for(let ind = 0; ind < 60; ind++){
        drawBlankDaruma(darumaEncoder.darumaCanvas, rollRot, xtrans, 0)
        drawMouth(darumaEncoder.darumaCanvas, mouthCurve)
        let closedness = ind < 40 ? 0 : ind <= 50 ? (ind-40)/10 : (60-ind)/10
        drawEyes(darumaEncoder.darumaCanvas, eyeTilt, closedness)
        encoder.addFrame(darumaEncoder.darumaCanvas.context)
        if(ind == 15 || ind == 45) goingUp = !goingUp
        xtrans = goingUp ? xtrans + rollDistance : xtrans - rollDistance
        rollRot = goingUp ? rollRot + rollUnit : rollRot - rollUnit
    }
    encoder.finish()
    return encoder.out.getData()
}

export { animateRolling }