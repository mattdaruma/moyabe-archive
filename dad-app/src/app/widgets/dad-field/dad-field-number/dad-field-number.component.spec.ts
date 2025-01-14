import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldNumberComponent } from './dad-field-number.component';

describe('DadFieldNumberComponent', () => {
  let component: DadFieldNumberComponent;
  let fixture: ComponentFixture<DadFieldNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
