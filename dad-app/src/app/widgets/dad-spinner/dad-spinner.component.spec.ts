import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadSpinnerComponent } from './dad-spinner.component';

describe('DadSpinnerComponent', () => {
  let component: DadSpinnerComponent;
  let fixture: ComponentFixture<DadSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
