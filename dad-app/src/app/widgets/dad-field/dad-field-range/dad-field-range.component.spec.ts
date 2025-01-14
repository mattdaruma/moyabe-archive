import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldRangeComponent } from './dad-field-range.component';

describe('DadFieldRangeComponent', () => {
  let component: DadFieldRangeComponent;
  let fixture: ComponentFixture<DadFieldRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
