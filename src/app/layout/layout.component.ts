import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router){}

  showHeaderAndFooter(): boolean {
    const currentRoute = this.router.url;
    return !currentRoute.includes('login'); 
  }
  navigateLogin(){
        this.router.navigate(['/login']).then(x => window.location.reload());

  }
}
