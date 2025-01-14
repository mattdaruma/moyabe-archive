import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadIconComponent } from './dad-icon.component';

describe('DadIconComponent', () => {
  let component: DadIconComponent;
  let fixture: ComponentFixture<DadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
