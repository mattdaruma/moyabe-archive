import { TestBed } from '@angular/core/testing';

import { DadInitializerService } from './dad-initializer.service';

describe('DadInitializerService', () => {
  let service: DadInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
