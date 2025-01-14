import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadImageComponent } from './dad-image.component';

describe('DadImageComponent', () => {
  let component: DadImageComponent;
  let fixture: ComponentFixture<DadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
