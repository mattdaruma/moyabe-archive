import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadChartComponent } from './dad-chart.component';

describe('DadChartComponent', () => {
  let component: DadChartComponent;
  let fixture: ComponentFixture<DadChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
