import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldSelectComponent } from './dad-field-select.component';

describe('DadFieldSelectComponent', () => {
  let component: DadFieldSelectComponent;
  let fixture: ComponentFixture<DadFieldSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
