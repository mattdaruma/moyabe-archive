import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFieldAutocompleteComponent } from './dad-field-autocomplete.component';

describe('DadFieldAutocompleteComponent', () => {
  let component: DadFieldAutocompleteComponent;
  let fixture: ComponentFixture<DadFieldAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadFieldAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadFieldAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
