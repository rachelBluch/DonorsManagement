import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBackground!:boolean
  title = 'DonorsManagement';
  constructor(private router:Router) {
    //this.showBackground = this.router.url === '/login' || this.router.url ==='/';
    this.showBackground=localStorage.getItem('password')==null
  }

}
