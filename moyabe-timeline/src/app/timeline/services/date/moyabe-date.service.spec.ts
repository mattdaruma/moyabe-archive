import { TestBed } from '@angular/core/testing';

import { MoyabeDateService } from './moyabe-date.service';

describe('DateService', () => {
  let service: MoyabeDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyabeDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
