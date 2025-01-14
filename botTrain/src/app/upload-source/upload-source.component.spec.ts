import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSourceComponent } from './upload-source.component';

describe('UploadSourceComponent', () => {
  let component: UploadSourceComponent;
  let fixture: ComponentFixture<UploadSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
