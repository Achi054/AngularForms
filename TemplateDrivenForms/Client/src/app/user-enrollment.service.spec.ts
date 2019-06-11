import { TestBed } from '@angular/core/testing';

import { UserEnrollmentService } from './user-enrollment.service';

describe('UserEnrollmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserEnrollmentService = TestBed.get(UserEnrollmentService);
    expect(service).toBeTruthy();
  });
});
