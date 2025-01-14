import { TestBed } from '@angular/core/testing';

import { DadCacheService } from './dad-cache.service';

describe('DadCacheService', () => {
  let service: DadCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
