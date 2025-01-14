import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDataComponent } from './train-data.component';

describe('TrainDataComponent', () => {
  let component: TrainDataComponent;
  let fixture: ComponentFixture<TrainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
