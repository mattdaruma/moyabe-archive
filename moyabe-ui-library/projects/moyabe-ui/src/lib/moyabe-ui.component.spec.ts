import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyabeUiComponent } from './moyabe-ui.component';

describe('MoyabeUiComponent', () => {
  let component: MoyabeUiComponent;
  let fixture: ComponentFixture<MoyabeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyabeUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyabeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
