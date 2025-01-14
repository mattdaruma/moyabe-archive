import { TestBed } from '@angular/core/testing';

import { BotManagerService } from './bot-manager.service';

describe('BotManagerService', () => {
  let service: BotManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
