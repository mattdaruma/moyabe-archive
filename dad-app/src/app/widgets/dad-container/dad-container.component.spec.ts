import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadContainerComponent } from './dad-container.component';

describe('DadContainerComponent', () => {
  let component: DadContainerComponent;
  let fixture: ComponentFixture<DadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
