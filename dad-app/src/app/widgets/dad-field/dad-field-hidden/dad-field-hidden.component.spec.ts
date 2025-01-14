import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldHiddenComponent } from './dad-field-hidden.component';

describe('DadFieldHiddenComponent', () => {
  let component: DadFieldHiddenComponent;
  let fixture: ComponentFixture<DadFieldHiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldHiddenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
