import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadTabsComponent } from './dad-tabs.component';

describe('DadTabsComponent', () => {
  let component: DadTabsComponent;
  let fixture: ComponentFixture<DadTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
