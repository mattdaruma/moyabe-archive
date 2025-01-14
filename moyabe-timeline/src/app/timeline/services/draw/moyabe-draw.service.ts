import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { TimelineDateGuide, MoyabeDateService } from './../date/moyabe-date.service';
import { TimelineDataItem, TimelineDataService } from './../data/timeline-data.service';
import { Subject } from 'rxjs';

export interface TimelineDrawSettings {
  width: number
  height: number
  fillStyle: string
  layerFillStyle: string
  timeline: TimelineDrawTimelineSettings
  guides: TimelineDrawGuideSettings
  events: TimelineDrawEventSettings
  alerts: TimelineDrawAlertettings
}
export interface TimelineDrawEventSettings {
  height: number
  fillStyle: string
  textFillStyle: string
}
export interface TimelineDrawTimelineSettings {
  strokeStyle: string
  lineWidth: number
}
export interface TimelineDrawAlertettings {
  strokeStyle: string
  fillStyle: string
  lineWidth: number
  radius: number
}
export interface TimelineDrawGuideSettings {
  default: TimelineDrawGuideSetting,
  unit: {
    [propName: string]: TimelineDrawGuideSetting
  }
}
export interface TimelineDrawGuideSetting {
  strokeStyle: string
  lineHeight: number
  lineWidth: number
  textAlign: CanvasTextAlign
  textBaseline: CanvasTextBaseline
  fontSize: number
  fontFamily: string
  textFillStyle: string
}
export interface TimelineDrawEvent {
  ratio: number
  span: number
  icon: string
  color: string
  display: string
}

@Injectable({
  providedIn: 'root'
})
export class MoyabeDrawService {
  //Animate Service draws with draw service using date and data service.
  private frame: HTMLCanvasElement = document.createElement('canvas')
  public animate = new Subject<HTMLCanvasElement>()
  //private animateInterval: NodeJS.Timeout;
  private guidesBuffer: {guide: TimelineDateGuide[], canvas: HTMLCanvasElement}[] = []
  private eventsBuffer: {event: TimelineDateGuide[], canvas: HTMLCanvasElement}[] = []



  //Draw Service just draws copies of these things.  It holds them in memory for efficiency... I hope...
  private backgroundLayer: HTMLCanvasElement = document.createElement('canvas')
  private timelineLayer: HTMLCanvasElement = document.createElement('canvas')
  private guidesLayer: HTMLCanvasElement = document.createElement('canvas')
  private eventsLayer: HTMLCanvasElement = document.createElement('canvas')
  private alertsLayer: HTMLCanvasElement = document.createElement('canvas')
  private menuLayer: HTMLCanvasElement = document.createElement('canvas')
  private settings: TimelineDrawSettings = {
    width: 1000,
    height: 1000,
    fillStyle: '#FFF',
    layerFillStyle: 'rgba(255, 255, 255, 0)',
    timeline: {
      strokeStyle: '#F00',
      lineWidth: 44
    },
    guides: {
      default: {
        strokeStyle: '#0F0',
        lineHeight: 10,
        lineWidth: 5,
        textAlign: 'center',
        textBaseline: 'top',
        fontSize: 16,
        fontFamily: 'px Roboto',
        textFillStyle: '#00F'
      },
      unit: {
        'y': {
          strokeStyle: '#F00',
          lineHeight: 36,
          lineWidth: 64,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 42,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        },
        'M': {
          strokeStyle: '#C40',
          lineHeight: 30,
          lineWidth: 32,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 36,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        },
        'd': {
          strokeStyle: '#4C0',
          lineHeight: 24,
          lineWidth: 16,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 30,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        },
        'h': {
          strokeStyle: '#0C4',
          lineHeight: 18,
          lineWidth: 8,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 24,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        },
        'm': {
          strokeStyle: '#04C',
          lineHeight: 12,
          lineWidth: 4,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 18,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        },
        's': {
          strokeStyle: '#00F',
          lineHeight: 6,
          lineWidth: 2,
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 12,
          fontFamily: 'px Roboto',
          textFillStyle: '#00F'
        }
      },
    },
    events: {
      height: 50,
      fillStyle: '#FF0',
      textFillStyle: '#0FF'
    },
    alerts: {
      strokeStyle: '#606',
      lineWidth: 4,
      fillStyle: 'rgba(255, 255, 255, 0',
      radius: 20
    }
  }
  constructor() { }
  private getContext(canvas: HTMLCanvasElement) {
    let context = canvas.getContext('2d')!
    context.beginPath()
    return context
  }
  updateSettings(newSettings: TimelineDrawSettings) {
    Object.assign(this.settings, newSettings)
  }
  setDimensions(width: number, height: number) {
    this.settings.width = width
    this.settings.height = height
    this.drawBackground()
    this.drawTimeline()
  }
  private clearCanvas(canvas: HTMLCanvasElement) {
    let context = this.getContext(canvas)
    context.fillStyle = this.settings.layerFillStyle
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  drawFrame(shiftRatio: number){
    this.frame.width = this.settings.width
    this.frame.height = this.settings.height
    this.clearCanvas(this.frame)
    let context = this.getContext(this.frame)
    this.drawTimeline()
    let shiftPixels = Math.floor(shiftRatio*this.frame.width)
    context.drawImage(this.timelineLayer, 0, 0)
    context.drawImage(this.guidesLayer, -shiftPixels, 0)
    context.drawImage(this.eventsLayer, 0, 0)
    this.drawAlerts()
    context.drawImage(this.alertsLayer, 0, 0)
    this.drawMenu()
    context.drawImage(this.menuLayer, 0, 0)
    this.animate.next(this.frame)
    return this.frame
  }
  private drawBackground(){
    this.backgroundLayer.width = this.settings.width
    this.backgroundLayer.height = this.settings.height
    let context = this.getContext(this.backgroundLayer)
    context.fillStyle = this.settings.fillStyle!
    context.fillRect(0, 0, this.settings.width, this.settings.height)
  }
  private drawTimeline(){
    this.timelineLayer.width = this.settings.width
    this.timelineLayer.height = this.settings.height
    this.clearCanvas(this.timelineLayer)
    let context = this.getContext(this.timelineLayer)
    context.strokeStyle = this.settings.timeline.strokeStyle
    context.lineWidth = this.settings.timeline.lineWidth
    let halfHeight = Math.floor(this.settings.height / 2)
    context.moveTo(0, halfHeight)
    context.lineTo(this.settings.width, halfHeight)
    context.stroke()
  }
  public drawGuides(guides: TimelineDateGuide[], bufferSize: number) {
    this.guidesLayer.height = this.settings.width
    this.guidesLayer.width = this.settings.width * bufferSize
    this.clearCanvas(this.guidesLayer)
    for (let index in guides) {
      let context = this.getContext(this.guidesLayer)
      let guide = guides[index]
      let x = Math.floor(guide.ratio * this.settings.width)
      let settings = this.settings.guides.unit[guide.unit]
        ? this.settings.guides.unit[guide.unit]
        : this.settings.guides.default
      context.strokeStyle = settings.strokeStyle
      context.lineWidth = settings.lineWidth
      context.textAlign = settings.textAlign
      context.textBaseline = settings.textBaseline
      context.font = `${settings.fontSize}${settings.fontFamily}`
      context.fillStyle = settings.textFillStyle
      let halfHeight = Math.floor(this.settings.height / 2)
      let halfTimelineHeight = Math.floor(this.settings.timeline.lineWidth / 2)
      context.moveTo(x, halfHeight - halfTimelineHeight)
      context.lineTo(x, halfHeight + halfTimelineHeight)
      context.stroke()
      context.fillText(guide.display, x, halfHeight + halfTimelineHeight + 5)
    }
  }
  public drawEvents(data: TimelineDrawEvent[]) {
    this.eventsLayer.width = this.settings.width
    this.eventsLayer.height = this.settings.height
    this.clearCanvas(this.eventsLayer)
    for (let index in data) {
      let context = this.getContext(this.eventsLayer)
      let datum = data[index]
      let xstart = Math.floor(datum.ratio * this.settings.width)
      let width = Math.floor(datum.span * this.settings.width)
      let halfHeight = this.settings.height / 2
      context.moveTo(xstart, halfHeight - this.settings.events.height)
      context.fillStyle = this.settings.events.fillStyle
      context.fillRect(xstart, halfHeight - Math.floor(this.settings.events.height/2),
        width, this.settings.events.height)
    }
  }
  public drawAlerts(){
    this.alertsLayer.width = this.settings.width
    this.alertsLayer.height = this.settings.height
    this.clearCanvas(this.alertsLayer)
    let context = this.getContext(this.alertsLayer)
    let halfHeight = this.settings.height / 2
    let halfWidth = this.settings.width / 2
    context.moveTo(halfWidth + this.settings.alerts.radius, halfHeight)
    context.strokeStyle = this.settings.alerts.strokeStyle
    context.lineWidth = this.settings.alerts.lineWidth
    context.arc(halfWidth, halfHeight, this.settings.alerts.radius, 0, 2 * Math.PI)
    context.fillStyle = this.settings.alerts.fillStyle!
    context.fill()
    context.stroke()
  }
  public drawMenu(){
  }
}
