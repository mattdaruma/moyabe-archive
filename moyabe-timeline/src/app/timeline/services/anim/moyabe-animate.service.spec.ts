import { TestBed } from '@angular/core/testing';

import { MoyabeAnimateService } from './moyabe-animate.service';

describe('MoyabeAnimateService', () => {
  let service: MoyabeAnimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyabeAnimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
