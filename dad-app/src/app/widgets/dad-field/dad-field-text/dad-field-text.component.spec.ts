import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldTextComponent } from './dad-field-text.component';

describe('DadFieldTextComponent', () => {
  let component: DadFieldTextComponent;
  let fixture: ComponentFixture<DadFieldTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
