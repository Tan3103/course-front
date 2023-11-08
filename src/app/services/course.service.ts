import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url = '/gateway/core/api/courses';

  constructor(private http: HttpClient) {
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createCourse(book: Object): Observable<Object> {
    return this.http.post(`${this.url}`, book);
  }

  updateCourse(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}/search`)
  }
}
