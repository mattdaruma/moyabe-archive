import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadTextComponent } from './dad-text.component';

describe('DadTextComponent', () => {
  let component: DadTextComponent;
  let fixture: ComponentFixture<DadTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
