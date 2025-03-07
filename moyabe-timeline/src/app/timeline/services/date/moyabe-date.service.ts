import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { TimelineDataItem } from './../data/timeline-data.service';
import { TimelineDrawEvent } from '../draw/moyabe-draw.service';

export interface TimelineDateGuide {
  ratio: number,
  display: string,
  date: number,
  unit: dayjs.ManipulateType & (dayjs.UnitTypeLong | dayjs.UnitTypeLongPlural | dayjs.UnitTypeShort)
}

export interface TimelineDateSettings {
  units: (dayjs.ManipulateType & dayjs.UnitType)[],
  ratioDifference: number
  center: Date
  scale: number
  unit: dayjs.ManipulateType & (dayjs.UnitTypeLong | dayjs.UnitTypeLongPlural | dayjs.UnitTypeShort)
}

export interface TimelineComponentSettings {
  tickTime: number
  refreshTime: number
}
@Injectable({
  providedIn: 'root'
})
export class MoyabeDateService {
  private settings: TimelineDateSettings = {
    center: new Date(),
    units: ['y', 'M', 'd', 'h', 'm', 's'],
    ratioDifference: .05,
    scale: 10,
    unit: 's',
  }
  private get minDate(): dayjs.Dayjs {
    return dayjs(this.settings.center).add(-this.settings.scale, this.settings.unit)
  }
  private get maxDate(): dayjs.Dayjs {
    return dayjs(this.settings.center).add(this.settings.scale, this.settings.unit)
  }
  public get dateSpan(): number {
    return this.maxDate.diff(this.minDate)
  }
  //date service tracks the current date and runs date comparisons
  constructor() { }
  recenter(newCenter: Date) {
    this.settings.center = newCenter
  }
  updateSettings(newSettings: TimelineDateSettings) {
    Object.assign(this.settings, newSettings)
  }
  public bufferSize = 5
  getGuides() {
    let minDate = this.minDate
    let maxDate = this.maxDate
    let bufferMaxDate = maxDate.add(this.bufferSize*this.settings.scale, this.settings.unit)
    let centerDate = dayjs(this.settings.center)
    let guides: TimelineDateGuide[] = []
    for (let unitIndex in this.settings.units) {
      let unit = this.settings.units[unitIndex]
      let unitFound = true
      let startAtEnd = false
      let unitCount = 0
      let looplimit = 10000
      let alwaysAtEnd = false
      while (unitFound) {
        startAtEnd = !startAtEnd
          unitCount++
          let unitDate: dayjs.Dayjs
          if (unitCount > looplimit) {
            unitFound = false
          }
        if (startAtEnd || alwaysAtEnd) {
          unitDate = centerDate.add(unitCount, unit).startOf(unit)
        } else {
          unitDate = centerDate.subtract(unitCount, unit).startOf(unit)
        }
        if (
          unitDate.isBefore(bufferMaxDate)
          && unitDate.isAfter(minDate)
        ) {
          let guideIndex = guides.findIndex(g => {
            return unitDate.toDate().getTime() == g.date
          })
          if (guideIndex == -1) {
            let newGuide = {
              ratio: Math.floor((unitDate.diff(minDate) / this.dateSpan) * 100) / 100,
              display: unitDate.format(unit) + ` ${unit}`,
              unit: unit,
              date: unitDate.toDate().getTime()
            } as TimelineDateGuide
            if (
              guides.findIndex(g => Math.abs(g.ratio - newGuide.ratio) < this.settings.ratioDifference) == -1
            ) {
              guides.push(newGuide)
            }
          }
        } else {
          if(unitDate.isAfter(bufferMaxDate)){
            unitFound = false
          }else{
            alwaysAtEnd = true
          }
        }
      }
    }
    guides.sort((ga, gb) => {
      return this.settings.units.indexOf(ga.unit) < this.settings.units.indexOf(gb.unit) ? 1
        : this.settings.units.indexOf(ga.unit) > this.settings.units.indexOf(gb.unit) ? -1 : 0
    })
    // let now = dayjs()
    // if (minDate.isBefore(now) && maxDate.isAfter(now)){
    //   guides.shift()
    //   guides.push({
    //     ratio: Math.floor((now.diff(minDate) / this.dateSpan) * 100) / 100,
    //     display: `${now.format('YYYY-MM-DD hh:mm:ss')}`,
    //     unit: 'y',
    //     date: now.toDate().getTime()
    //   })
    // }
    return guides
  }
  getEvents(
    data: TimelineDataItem[]
  ): TimelineDrawEvent[] {
    let futureStart = dayjs().add(10, 's')
    let futureStop = futureStart.add(10, 's')
    let eventSpan = futureStop.diff(futureStart)
    return [{
      ratio: futureStart.diff(this.minDate) / this.dateSpan,
      span: eventSpan / this.dateSpan,
      display: 'hehe',
      color: '#f00',
      icon: 'smile'
    }]
  }
  getAlerts() { }
}
0