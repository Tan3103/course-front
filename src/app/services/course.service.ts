import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url = '/api/courses';
  authToken: string = "";

  headers = null;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // headers = new HttpHeaders({
  //   'Authorization': `Bearer` + this.authToken
  // });
  getCourseById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('auth-user')
    });
    return this.http.get(`${this.url}/${id}`, {headers});
  }

  createCourse(book: Object): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('auth-user')
    });
    return this.http.post(`${this.url}`, book, {headers});
  }

  updateCourse(id: number, value: any): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('auth-user')
    });
    return this.http.put(`${this.url}/${id}`, value, {headers});
  }

  deleteCourse(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('auth-user')
    });
    return this.http.delete(`${this.url}/${id}`, {headers});
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('auth-user')
    });
    return this.http.get<any>(`${this.url}/search`, {headers})
  }
}
