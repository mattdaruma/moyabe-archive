import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldRadioComponent } from './dad-field-radio.component';

describe('DadFieldRadioComponent', () => {
  let component: DadFieldRadioComponent;
  let fixture: ComponentFixture<DadFieldRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
