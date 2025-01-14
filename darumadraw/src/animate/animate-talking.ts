import { DarumaEncoder } from "../daruma-encoder"
import { drawBlankDaruma } from "../draw/script-blank-daruma"
import { drawEyes } from "../draw/draw-eyes"
import { drawMouth } from "../draw/draw-mouth"

const animateTalking = (darumaEncoder: DarumaEncoder, mouthCurve: number = 0, eyeTilt?: number)=>{
    let encoder = darumaEncoder.getEncoder()
    encoder.setDelay(50)
    encoder.start()
    let goingUp = false
    for(let ind = 0; ind < 60; ind++){
        let fr = 10
        if(ind%fr == 0) goingUp = !goingUp
        let openness = goingUp ? ind%fr/fr : (fr-ind%fr)/fr
        darumaEncoder.darumaCanvas.context.rotate(Math.PI)
        drawBlankDaruma(darumaEncoder.darumaCanvas)
        drawMouth(darumaEncoder.darumaCanvas, mouthCurve, openness)
        let closedness = ind < 40 ? 0 : ind <= 50 ? (ind-40)/10 : (60-ind)/10
        drawEyes(darumaEncoder.darumaCanvas, eyeTilt, closedness)
        encoder.addFrame(darumaEncoder.darumaCanvas.context)
    }
    encoder.finish()
    return encoder.out.getData()
}

export { animateTalking }