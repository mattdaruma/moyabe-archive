import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadDialogComponent } from './dad-dialog.component';

describe('DadDialogComponent', () => {
  let component: DadDialogComponent;
  let fixture: ComponentFixture<DadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
