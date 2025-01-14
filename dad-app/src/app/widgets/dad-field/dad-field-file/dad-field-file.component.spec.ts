import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldFileComponent } from './dad-field-file.component';

describe('DadFieldFileComponent', () => {
  let component: DadFieldFileComponent;
  let fixture: ComponentFixture<DadFieldFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
