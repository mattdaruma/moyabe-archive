import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyabeBlogComponent } from './moyabe-blog.component';

describe('MoyabeBlogComponent', () => {
  let component: MoyabeBlogComponent;
  let fixture: ComponentFixture<MoyabeBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyabeBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyabeBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
