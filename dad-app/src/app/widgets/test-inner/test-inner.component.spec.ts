import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInnerComponent } from './test-inner.component';

describe('TestInnerComponent', () => {
  let component: TestInnerComponent;
  let fixture: ComponentFixture<TestInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
