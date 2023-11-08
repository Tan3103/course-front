import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Router} from "@angular/router";

const AUTH_API = '/gateway/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'register',
      {
        firstname,
        lastname,
        email,
        password,
      }
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(AUTH_API + 'token', {email, password})
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
    this.router.navigate(['login']);
  }
}
