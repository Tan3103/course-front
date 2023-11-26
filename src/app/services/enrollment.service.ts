import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnrollmentModel} from "../models/enrollment.model";

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  url = '/gateway/core/api/enrollment';

  constructor(private http: HttpClient) {
  }

  enrollmentCourse(enrollmentModel: EnrollmentModel): Observable<Object> {
    return this.http.post(`${this.url}`, enrollmentModel);
  }

  checkEnrollment(enrollmentModel: EnrollmentModel): Observable<any> {
    return this.http.get(`${this.url}/check?userId=` + enrollmentModel.userId + `&courseId=` + enrollmentModel.courseId);
  }
}
