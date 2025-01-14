import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadPageComponent } from './dad-page.component';

describe('DadPageComponent', () => {
  let component: DadPageComponent;
  let fixture: ComponentFixture<DadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
