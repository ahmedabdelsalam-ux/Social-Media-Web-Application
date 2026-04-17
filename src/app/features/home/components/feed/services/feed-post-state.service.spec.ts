import { TestBed } from '@angular/core/testing';

import { FeedPostStateService } from './feed-post-state.service';

describe('FeedPostStateService', () => {
  let service: FeedPostStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedPostStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
