import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldColorComponent } from './dad-field-color.component';

describe('DadFieldColorComponent', () => {
  let component: DadFieldColorComponent;
  let fixture: ComponentFixture<DadFieldColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
