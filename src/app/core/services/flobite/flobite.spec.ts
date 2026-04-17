import { TestBed } from '@angular/core/testing';

import { Flobite } from './flobite';

describe('Flobite', () => {
  let service: Flobite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Flobite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
