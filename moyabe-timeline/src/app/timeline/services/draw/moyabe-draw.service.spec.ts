import { TestBed } from '@angular/core/testing';

import { MoyabeDrawService } from './moyabe-draw.service';

describe('DrawingService', () => {
  let service: MoyabeDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyabeDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
