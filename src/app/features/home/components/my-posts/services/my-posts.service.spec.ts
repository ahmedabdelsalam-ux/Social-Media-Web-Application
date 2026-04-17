import { TestBed } from '@angular/core/testing';

import { MyPostsService } from './my-posts.service';

describe('MyPostsService', () => {
  let service: MyPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
