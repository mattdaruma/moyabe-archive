import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResourceComponent } from './api-resource.component';

describe('ApiResourceComponent', () => {
  let component: ApiResourceComponent;
  let fixture: ComponentFixture<ApiResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
