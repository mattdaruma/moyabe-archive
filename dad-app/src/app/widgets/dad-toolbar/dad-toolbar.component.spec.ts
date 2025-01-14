import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadToolbarComponent } from './dad-toolbar.component';

describe('DadToolbarComponent', () => {
  let component: DadToolbarComponent;
  let fixture: ComponentFixture<DadToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
