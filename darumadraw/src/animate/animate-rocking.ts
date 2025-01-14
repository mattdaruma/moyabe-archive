import { DarumaEncoder } from "../daruma-encoder"
import { drawBlankDaruma } from "../draw/script-blank-daruma"
import { drawEyes } from "../draw/draw-eyes"
import { drawMouth } from "../draw/draw-mouth"

const animateRocking = (darumaEncoder: DarumaEncoder, mouthCurve: number = 0, eyeTilt?: number, rock: number = .2)=>{
    if(rock < 0 || rock > 1) rock = 0
    let encoder = darumaEncoder.getEncoder()
    encoder.setDelay(50)
    encoder.start()
    let goingUp = true
    let rollMax = Math.PI*rock
    let rollUnit = rollMax/15
    let rollRot = 0
    for(let ind = 0; ind < 60; ind++){
        drawBlankDaruma(darumaEncoder.darumaCanvas, rollRot, 0, 0)
        drawMouth(darumaEncoder.darumaCanvas, mouthCurve)
        let closedness = ind < 40 ? 0 : ind <= 50 ? (ind-40)/10 : (60-ind)/10
        drawEyes(darumaEncoder.darumaCanvas, eyeTilt, closedness)
        encoder.addFrame(darumaEncoder.darumaCanvas.context)
        if(ind == 15 || ind == 45) goingUp = !goingUp
        rollRot = goingUp ? rollRot + rollUnit : rollRot - rollUnit
    }
    encoder.finish()
    return encoder.out.getData()
}

export { animateRocking }