import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { login } from './models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup = this.fb.group({
    userName: [''],
    password: ['']
  })
  // user:Login=new Login() 
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
    localStorage.clear();
    localStorage.removeItem('password')
  }

  login() {
    let value = this.loginForm.value;
    const user: login = {
      userName: value.userName,
      password: value.password,
    };
    // this.user.userName=value.userName;
    // this.user.password=value.password;
    // this.user = ({userName: value.userName,password:value.password} );
    this.loginService.login(user).subscribe(x => {
      if (x) {
        this.router.navigate(['/desktop']).then(x => window.location.reload());
        localStorage.setItem('userName', value.userName)
        localStorage.setItem('password', value.password)
      }

    })
  }
}
