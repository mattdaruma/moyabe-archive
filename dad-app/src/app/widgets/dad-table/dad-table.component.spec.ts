import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadTableComponent } from './dad-table.component';

describe('DadTableComponent', () => {
  let component: DadTableComponent;
  let fixture: ComponentFixture<DadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
