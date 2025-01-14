import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadWidgetComponent } from './dad-widget.component';

describe('DadWidgetComponent', () => {
  let component: DadWidgetComponent;
  let fixture: ComponentFixture<DadWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
