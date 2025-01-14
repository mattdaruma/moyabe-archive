import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldDateComponent } from './dad-field-date.component';

describe('DadFieldDateComponent', () => {
  let component: DadFieldDateComponent;
  let fixture: ComponentFixture<DadFieldDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
