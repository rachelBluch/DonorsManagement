// import { CanActivateFn } from '@angular/router';

// export const donorManamgementGuard: CanActivateFn = (route, state) => {
//   return true;
// };




import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DonorManamgementGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('userName')!=null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}