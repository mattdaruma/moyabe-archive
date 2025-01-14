import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldCheckboxComponent } from './dad-field-checkbox.component';

describe('DadFieldCheckboxComponent', () => {
  let component: DadFieldCheckboxComponent;
  let fixture: ComponentFixture<DadFieldCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
