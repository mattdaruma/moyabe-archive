import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadEditorComponent } from './dad-editor.component';

describe('DadEditorComponent', () => {
  let component: DadEditorComponent;
  let fixture: ComponentFixture<DadEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
