import { TestBed } from '@angular/core/testing';

import { ChangPasswordService } from './chang-password.service';

describe('ChangPasswordService', () => {
  let service: ChangPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
