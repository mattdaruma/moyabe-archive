import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadListComponent } from './dad-list.component';

describe('DadListComponent', () => {
  let component: DadListComponent;
  let fixture: ComponentFixture<DadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
