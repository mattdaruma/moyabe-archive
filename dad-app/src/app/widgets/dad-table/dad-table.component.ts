import { Component } from '@angular/core';
import { WidgetComponentBase } from '../dad-widget.component.base';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Subject, combineLatestWith, concatAll, debounceTime, first, map, shareReplay, startWith } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-dad-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, MatSortModule, MatButtonModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, DragDropModule],
  templateUrl: './dad-table.component.html',
  styleUrl: './dad-table.component.scss'
})
export class DadTableComponent extends WidgetComponentBase {
  Columns = new Subject<{Type: string, Key: string, Display: string}[]>()
  private displayedColumns = new Subject<{Type: string, Key: string, Display: string}[]>()
  HiddenColumns = this.displayedColumns.pipe(
    combineLatestWith(this.Columns.pipe(shareReplay(1))),
    map(([d, c]) => c.filter(ci => !d.find(di => di.Key === ci.Key))),
    startWith([] as {Type: string, Key: string, Display: string}[]),
    shareReplay(1)
  )
  Page = new Subject<any>()
  private data = new Subject<any[]>()
  private sort = new Subject<Sort>()
  private filter = new Subject<any>()
  FilterForm = new FormGroup({} as {[prop: string]: FormControl})
  DisplayedColumns = this.displayedColumns.pipe(
    combineLatestWith(this.HiddenColumns),
    map(([c, h]) => {
      console.warn('DISPLAYED MAP', h)
      let shown = c.filter(ic => !h.find(ih => ic.Key == ih.Key))
      return shown
    }),
    shareReplay(1)
  )
  DisplayedColumnKeys = this.DisplayedColumns.pipe(map(c => c.map(ic => ic.Key)), shareReplay(1))
  Data = this.data.pipe(
    combineLatestWith(this.sort.pipe(startWith({ active: '', direction: '' }))),
    combineLatestWith(this.Page.pipe(startWith({ length: 10, pageIndex: 0, pageSize: 5 }))),
    combineLatestWith(this.FilterForm.valueChanges.pipe(debounceTime(80), startWith({ } as {[prop: string]: FormControl}))),
    combineLatestWith(this.Columns.pipe(shareReplay(1))),
    debounceTime(300),
    map(([[[[d, s], p], f], c]) => {
      if(this.FilterForm.valid){
        for(let key in f){
          if((f[key] as FormControl) !== null){
            let cleanKey = key.replace('-lt', '').replace('-gt', '')
            let col = c.find(ic => ic.Key === cleanKey)
            if(col){
              if(col.Type === 'string') d = d.filter(x => x[key]?.includes ? x[key].toLowerCase().includes(f[key].toLowerCase()) : true)
              if(col.Type === 'number'){
                if(key.endsWith('-lt')) d = d.filter(x => x[cleanKey] <= f[key])
                if(key.endsWith('-gt')) d = d.filter(x => x[cleanKey] >= f[key])
              }
              if(col.Type === 'date'){
                if(key.endsWith('-lt')) d = d.filter(x => x[cleanKey] <= (f[key].getTime()))
                if(key.endsWith('-gt')) d = d.filter(x => x[cleanKey] >= (f[key].getTime()))
              }
            }
          }
        }
      }
      this.DataCount = d.length
      if (s.direction.length > 0) {
        d = d.sort((a, b) => {
          if (a[s.active] > b[s.active]) return s.direction === 'asc' ? 1 : -1
          if (a[s.active] < b[s.active]) return s.direction === 'asc' ? -1 : 1
          return 0
        })
      }
      if(p.pageIndex * p.pageSize >= d.length) p.pageIndex = 0
      return d.slice(p.pageIndex * p.pageSize, (p.pageIndex * p.pageSize) + p.pageSize)
    }),
    shareReplay(1)
  )
  DataCount = 0 as number
  OnSort = (sort: Sort) => this.sort.next(sort)
  OnPage = (page: PageEvent) => this.Page.next(page)
  OnFilter = (filter: any) => this.filter.next(filter)
  OnDrop = (event: any) => {
    this.DisplayedColumns.pipe(first()).subscribe(d => {
      moveItemInArray(d, event.previousIndex, event.currentIndex)
      this.displayedColumns.next(d)
    })
  }
  OnRemoveColumn(col: any) {
    this.DisplayedColumns.pipe(first()).subscribe(d => {
      let index = d.findIndex(di => di.Key == col.Key)
      if(index > -1) d.splice(index, 1)
      this.displayedColumns.next(d)
    })
  }
  OnAddColumn(col: any) {
    this.DisplayedColumns.pipe(first()).subscribe(d => {
      d.unshift(col)
      this.displayedColumns.next(d)
    })
  }
  constructor() {
    super()
    this.Widget.subscribe(w => {
      this.data.next(w.Data.Data ?? [])
      for(let column of w.Data.Columns!){
        if(column.Type === 'string') this.FilterForm.addControl(column.Key, new FormControl<string | null>(null))
        if(column.Type === 'number') {
          this.FilterForm.addControl(`${column.Key}-gt` as any, new FormControl<number | null>(null))
          this.FilterForm.addControl(`${column.Key}-lt` as any, new FormControl<number | null>(null))
        }
        if(column.Type === 'date') {
          this.FilterForm.addControl(`${column.Key}-gt` as any, new FormControl<Date | null>(null))
          this.FilterForm.addControl(`${column.Key}-lt` as any, new FormControl<Date | null>(null))
        }
      }
      this.Columns.next(w.Data.Columns ?? [])
      this.displayedColumns.next(w.Data.Columns ?? [])
    })
  }
}
