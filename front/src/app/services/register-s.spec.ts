import { TestBed } from '@angular/core/testing';

import { RegisterS } from './register-s';

describe('RegisterS', () => {
  let service: RegisterS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
