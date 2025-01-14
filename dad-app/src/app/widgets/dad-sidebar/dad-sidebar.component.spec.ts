import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadSidebarComponent } from './dad-sidebar.component';

describe('DadSidebarComponent', () => {
  let component: DadSidebarComponent;
  let fixture: ComponentFixture<DadSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
