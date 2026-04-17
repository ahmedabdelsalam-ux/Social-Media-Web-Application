import { TestBed } from '@angular/core/testing';

import { RegisterauthService } from './registerauth.service';

describe('RegisterauthService', () => {
  let service: RegisterauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
