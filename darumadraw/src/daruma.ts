import { DarumaCanvas } from './daruma-canvas'
import { colorCalculate } from './color-calculator'
import { drawBlankDaruma } from './draw/script-blank-daruma'
import { drawEyes } from './draw/draw-eyes'
import { animateTalking } from './animate/animate-talking'
import { DarumaEncoder } from './daruma-encoder'
import { animateRolling } from './animate/animate-rolling'
import { drawMouth } from './draw/draw-mouth'
const GIFEncoder = require('gif-encoder-2')
class Daruma {
    darumaCanvas: DarumaCanvas
    darumaEncoder: DarumaEncoder
    mood: Moods = Moods.NEUTRAL
    constructor(){
        this.darumaCanvas = new DarumaCanvas()
        this.darumaEncoder = new DarumaEncoder(this.darumaCanvas)
    }
    setColor(color: string){
        this.darumaCanvas.setColor(colorCalculate(color))
        console.warn('outline', this.darumaCanvas.colors.outlineColor, this.darumaCanvas.colors.faceColor)
    }
    setMood(mood: Moods){
        this.mood = mood
    }
    getPose(){
        switch(this.mood){
            case Moods.HAPPY:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas)
                drawMouth(this.darumaCanvas, 1)
                break
            case Moods.SAD:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas, -1)
                drawMouth(this.darumaCanvas, -1)
                break
            case Moods.NEUTRAL:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas)
                drawMouth(this.darumaCanvas)
                break
            case Moods.ANGRY:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas, 1)
                drawMouth(this.darumaCanvas)
                break
            case Moods.TIRED:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas, 0)
                drawMouth(this.darumaCanvas)
                break
            default:
                drawBlankDaruma(this.darumaCanvas)
                drawEyes(this.darumaCanvas)
                drawMouth(this.darumaCanvas)
                break
        }
        return this.darumaCanvas.canvas.toBuffer('image/png')
    }
    getEmote(){
        switch(this.mood){
            case Moods.HAPPY:
                return animateRolling(this.darumaEncoder, 1, undefined, .15)
            case Moods.NEUTRAL: 
                return animateRolling(this.darumaEncoder, 0, undefined, .01)
            case Moods.SAD:
                return animateRolling(this.darumaEncoder, -1, -1, .1)
            case Moods.ANGRY:
                return animateRolling(this.darumaEncoder, 0, 1, .2)
            case Moods.TIRED:
                return animateRolling(this.darumaEncoder, 0, 0, .01)
            default: 
                return animateRolling(this.darumaEncoder, 0, undefined, .01)
        }
    }
    getSpeech(){
        switch(this.mood){
            case Moods.HAPPY:
                return animateTalking(this.darumaEncoder, 1)
            case Moods.NEUTRAL: 
                return animateTalking(this.darumaEncoder)
            case Moods.SAD:
                return animateTalking(this.darumaEncoder, -1, -1)
            case Moods.ANGRY:
                return animateTalking(this.darumaEncoder, 0, 1)
            case Moods.TIRED:
                return animateTalking(this.darumaEncoder, 0, 0)
            default: 
                return animateTalking(this.darumaEncoder)
        }}
}

enum Moods {
    NEUTRAL,
    HAPPY,
    SAD,
    ANGRY,
    TIRED
}

export { Daruma, Moods }
