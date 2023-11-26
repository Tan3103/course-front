import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Router} from "@angular/router";

const AUTH_API = '/gateway/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userDdo = new BehaviorSubject<number>(0);

  constructor(private router: Router, private http: HttpClient) {
  }

  get userDdo$(): Observable<number> {
    return this._userDdo.asObservable();
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
        tap(userData => {
          let tokenStr = "Bearer " + userData.token;

          sessionStorage.setItem("username", email);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("userId", userData.userId);
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
