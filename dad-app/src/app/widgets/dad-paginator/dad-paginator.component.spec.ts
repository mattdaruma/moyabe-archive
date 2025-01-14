import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadPaginatorComponent } from './dad-paginator.component';

describe('DadPaginatorComponent', () => {
  let component: DadPaginatorComponent;
  let fixture: ComponentFixture<DadPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
