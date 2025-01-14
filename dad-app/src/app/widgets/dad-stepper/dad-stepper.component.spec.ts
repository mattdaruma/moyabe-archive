import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadStepperComponent } from './dad-stepper.component';

describe('DadStepperComponent', () => {
  let component: DadStepperComponent;
  let fixture: ComponentFixture<DadStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
