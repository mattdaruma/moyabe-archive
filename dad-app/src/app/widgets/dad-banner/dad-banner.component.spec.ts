import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadBannerComponent } from './dad-banner.component';

describe('DadBannerComponent', () => {
  let component: DadBannerComponent;
  let fixture: ComponentFixture<DadBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
