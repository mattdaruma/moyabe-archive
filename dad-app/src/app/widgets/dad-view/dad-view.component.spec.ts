import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadViewComponent } from './dad-view.component';

describe('DadViewComponent', () => {
  let component: DadViewComponent;
  let fixture: ComponentFixture<DadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
