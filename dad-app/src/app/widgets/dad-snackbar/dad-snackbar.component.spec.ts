import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadSnackbarComponent } from './dad-snackbar.component';

describe('DadSnackbarComponent', () => {
  let component: DadSnackbarComponent;
  let fixture: ComponentFixture<DadSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
