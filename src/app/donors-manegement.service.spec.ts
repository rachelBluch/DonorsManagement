import { TestBed } from '@angular/core/testing';

import { DonorsManegementService } from './donors-manegement.service';

describe('DonorsManegmentService', () => {
  let service: DonorsManegementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorsManegementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
