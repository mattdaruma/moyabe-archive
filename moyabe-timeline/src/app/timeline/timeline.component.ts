import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimelineDataService } from './services/data/timeline-data.service';
import { TimelineDrawEvent, MoyabeDrawService } from './services/draw/moyabe-draw.service';
import { TimeLineSettings, MoyabeStateService } from './services/state/moyabe-state.service';
import { TimelineDateGuide, MoyabeDateService } from './services/date/moyabe-date.service';
import * as dayjs from 'dayjs';

export interface TimelineComponentSettings {
  tickTime: number
  refreshTime: number
  autoCenter: boolean,
  center: Date
}


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent {
  settings: TimelineComponentSettings = {
    tickTime: 100,
    refreshTime: 4900,
    autoCenter: true,
    center: new Date()
  }

  @ViewChild('timelineCanvas') set content(content: ElementRef<HTMLCanvasElement>) {
    this.canvas = content.nativeElement
    this.setCanvasSize()
  }
  private canvas: HTMLCanvasElement | null = null
  get domReady() {
    return this.container && this.canvas
  }
  @ViewChild('timelineContainer') container: ElementRef | null = null
  //private windowResize = fromEvent(window, 'resize').pipe(debounceTime(30))
  private tickInterval: NodeJS.Timer | null = null
  constructor(
    private data: TimelineDataService,
    private draw: MoyabeDrawService,
    private date: MoyabeDateService  ) {
    //Timeline Component listens to animate service frames to update the canvas.
    //It also registers click events
    //==> pulsing output events and
    //==> triggering animations
    
    this.tickInterval = setInterval(() => { this.onTick() }, this.settings.tickTime)
    this.draw.animate.subscribe(frame => {
      this.canvas!.getContext('2d')!.drawImage(frame, 0, 0)
    })
  }
  private tickCount: number = 0
  private amFirst: boolean = true
  private get ticksToShift() {
    return Math.ceil(this.date.dateSpan / this.settings.tickTime)
  }
  private get fullShifts(){
    return Math.floor(this.ticksToShift / this.tickCount)
  }
  private get shiftRatio(): number{
    return this.settings.tickTime / this.date.dateSpan
  }
  public now = new Date()
  onTick = () => {
    this.tickCount = this.tickCount + 1
    this.now = new Date()
    this.setCanvasSize()
    if (!this.domReady) return
    let ticksToShift = this.ticksToShift
    if (this.settings.autoCenter) {
      this.date.recenter(this.now)
      if (this.amFirst) {
        let events = this.date.getEvents(this.data.data)
        let guides = this.date.getGuides()
        this.draw.drawGuides(guides, this.date.bufferSize)
        this.draw.drawEvents(events)
        this.amFirst = false
      }
      if (this.tickCount > ticksToShift) {
        let guides = this.date.getGuides()
        this.draw.drawGuides(guides, this.date.bufferSize)
        this.tickCount = 0
      }
      let shiftRatio = this.tickCount * this.shiftRatio
      this.draw.drawFrame(shiftRatio)
    }
    //otherwise just draw it once and listen for interactions
  }
  setCanvasSize() {
    this.canvas!.width = this.container?.nativeElement.offsetWidth
    this.canvas!.height = this.container?.nativeElement.offsetHeight
    this.draw.setDimensions(this.canvas!.width, this.canvas!.height)
  }
}