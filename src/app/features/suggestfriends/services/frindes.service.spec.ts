import { TestBed } from '@angular/core/testing';

import { FrindesService } from './frindes.service';

describe('FrindesService', () => {
  let service: FrindesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrindesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
