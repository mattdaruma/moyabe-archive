import { TestBed } from '@angular/core/testing';

import { DadPageService } from './dad-page.service';

describe('DadPageService', () => {
  let service: DadPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
