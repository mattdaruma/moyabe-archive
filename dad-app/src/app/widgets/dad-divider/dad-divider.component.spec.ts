import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadDividerComponent } from './dad-divider.component';

describe('DadDividerComponent', () => {
  let component: DadDividerComponent;
  let fixture: ComponentFixture<DadDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadDividerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
