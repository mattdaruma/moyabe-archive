import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadProgressComponent } from './dad-progress.component';

describe('DadProgressComponent', () => {
  let component: DadProgressComponent;
  let fixture: ComponentFixture<DadProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
