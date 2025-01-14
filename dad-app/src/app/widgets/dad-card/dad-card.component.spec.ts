import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadCardComponent } from './dad-card.component';

describe('DadCardComponent', () => {
  let component: DadCardComponent;
  let fixture: ComponentFixture<DadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
