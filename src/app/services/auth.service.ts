import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = '/api/v1/auth/';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'authenticate',
      {
        email,
        password,
      },{
        headers: new HttpHeaders()
      }
    );
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

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {});
  }

  getAuthTokenFromCache() {
    return sessionStorage.getItem('auth-user');
  }
}
