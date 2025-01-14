import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, combineLatest } from 'rxjs';
import { TimelineDataService } from './services/data/timeline-data.service';

export interface TimelineSettings {
  moment: Date
  scale: number
  scaleUnits: string
}

export interface TimelineAutoCenterSettings {
  centerOnNow?: boolean
  centerOffset?: number
  centerOffsetUnits?: string
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  //draw super wide line/guides/events
  //on every pulse, pan superwide and draw alert frame0
  constructor(private data: TimelineDataService) { 
  }
  createTimeline(moment: Date, scale: number, units: string){
    return new MoyabeTimeline(moment, scale, units, this.data)
  }
}

export class MoyabeTimeline {
  private _frame = new MoyabeDraw()
  public frame = new ReplaySubject<MoyabeTimelineFrame>(1)
  private center: Date
  private scale: number
  private units: string
  private layers: TimelineLayers
  private timelineBuffer = new MoyabeDraw()
  //updated on view change settings
  private guides: any[]
  private events: any[]
  private alerts: any[]
  constructor(center: Date, scale: number, units: string, data: TimelineDataService){
    this.center = center
    this.scale = scale
    this.units = units
    this.layers = {
      background: new MoyabeDraw(),
      line: new MoyabeDraw(),
      guides: new MoyabeDraw(),
      events: new MoyabeDraw(),
      alerts: new MoyabeDraw(),
      menu: new MoyabeDraw(),
      clicks: new MoyabeDraw()
    }
    this.guides = []
    this.events = []
    this.alerts = []
  }
  updateMoment(moment: Date, scale: number, units: string){
    //check whether we're still in buffer safe zone
    //update data if not, keep good data if possible
    //pulse new frame
  }
  updateDisplay(){
    //modify necessary layers
    //pulse new frame
  }
}
export interface MoyabeTimelineFrame{
  frame: MoyabeDraw,
  clickMap: any
}
export interface TimelineLayers {
  background: MoyabeDraw,
  line: MoyabeDraw,
  guides: MoyabeDraw,
  events: MoyabeDraw,
  alerts: MoyabeDraw,
  menu: MoyabeDraw,
  clicks: MoyabeDraw
}
export class MoyabeDraw {
  public lastDrawTime = new Date()
  public readonly canvas = document.createElement('canvas')
  private readonly ctx = this.canvas.getContext('2d')!
  constructor(){
  }
  setDimensions(width: number, height: number){
    this.canvas.width = width
    this.canvas.height = height
    this.lastDrawTime = new Date()
  }
  clear(){
    this.ctx.beginPath()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.lastDrawTime = new Date()
  }
  fill(fillStyle: string){
    this.ctx.beginPath()
    this.ctx.fillStyle = fillStyle
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.lastDrawTime = new Date()
  }
  line(x1: number, y1: number, x2: number, y2: number, strokeStyle: string, lineWidth: number){
    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeStyle
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    this.lastDrawTime = new Date()
  }
  textBubble(){}
}