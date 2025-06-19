import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { login } from './models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "DonorsManagement/"

  constructor(private _http: HttpClient) { }

  login(user:login):Observable<boolean>{
    return this._http.post<boolean>(this.url+'Login',user)
  }
}
