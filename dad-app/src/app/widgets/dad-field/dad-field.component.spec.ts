import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldComponent } from './dad-field.component';

describe('DadFieldComponent', () => {
  let component: DadFieldComponent;
  let fixture: ComponentFixture<DadFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
