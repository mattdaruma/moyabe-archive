import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldPasswordComponent } from './dad-field-password.component';

describe('DadFieldPasswordComponent', () => {
  let component: DadFieldPasswordComponent;
  let fixture: ComponentFixture<DadFieldPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
