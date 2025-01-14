import { TestBed } from '@angular/core/testing';

import { DadThemeService } from './dad-theme.service';

describe('DadThemeService', () => {
  let service: DadThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
