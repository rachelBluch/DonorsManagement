// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { donorManamgementGuard } from './donor-manamgement.guard';

// describe('donorManamgementGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => donorManamgementGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { DonorManamgementGuard } from './donor-manamgement.guard';


describe('GuardGuard', () => {
  let guard: DonorManamgementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DonorManamgementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});