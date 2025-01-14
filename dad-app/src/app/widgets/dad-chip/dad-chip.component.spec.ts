import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadChipComponent } from './dad-chip.component';

describe('DadChipComponent', () => {
  let component: DadChipComponent;
  let fixture: ComponentFixture<DadChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
