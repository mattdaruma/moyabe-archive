import { TestBed } from '@angular/core/testing';

import { MoyabeUiService } from './moyabe-ui.service';

describe('MoyabeUiService', () => {
  let service: MoyabeUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyabeUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
