import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadButtonComponent } from './dad-button.component';

describe('DadButtonComponent', () => {
  let component: DadButtonComponent;
  let fixture: ComponentFixture<DadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
