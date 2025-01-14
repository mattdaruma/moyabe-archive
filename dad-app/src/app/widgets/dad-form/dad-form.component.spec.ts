import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFormComponent } from './dad-form.component';

describe('DadFormComponent', () => {
  let component: DadFormComponent;
  let fixture: ComponentFixture<DadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
