import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadTreeComponent } from './dad-tree.component';

describe('DadTreeComponent', () => {
  let component: DadTreeComponent;
  let fixture: ComponentFixture<DadTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
