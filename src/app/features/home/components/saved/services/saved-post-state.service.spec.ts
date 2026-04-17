import { TestBed } from '@angular/core/testing';

import { SavedPostStateService } from './saved-post-state.service';

describe('SavedPostStateService', () => {
  let service: SavedPostStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedPostStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
