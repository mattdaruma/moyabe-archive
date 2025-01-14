import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsColorsComponent } from './settings-colors.component';

describe('SettingsColorsComponent', () => {
  let component: SettingsColorsComponent;
  let fixture: ComponentFixture<SettingsColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsColorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
