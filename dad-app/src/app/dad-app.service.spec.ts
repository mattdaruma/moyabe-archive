import { TestBed } from '@angular/core/testing';

import { DadAppService } from './dad-app.service';

describe('DadAppService', () => {
  let service: DadAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
