import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadExpansionComponent } from './dad-expansion.component';

describe('DadExpansionComponent', () => {
  let component: DadExpansionComponent;
  let fixture: ComponentFixture<DadExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadExpansionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
