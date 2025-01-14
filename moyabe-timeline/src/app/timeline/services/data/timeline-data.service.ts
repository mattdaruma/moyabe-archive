import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface TimelineDataItem {
  start: Date,
  end: Date,
  icon: string,
  display: string
}

@Injectable({
  providedIn: 'root'
})
export class TimelineDataService {
  data: TimelineDataItem[] = []
  constructor() {
  }
}
