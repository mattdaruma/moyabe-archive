import { TestBed } from '@angular/core/testing';

import { MoyabeStateService } from './moyabe-state.service';

describe('SettingsService', () => {
  let service: MoyabeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyabeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
