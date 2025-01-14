import { TestBed } from '@angular/core/testing';

import { DadRoutesService } from './dad-routes.service';

describe('DadRoutesService', () => {
  let service: DadRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
