import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.model";
import {CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnrollmentService} from "../../services/enrollment.service";
import {EnrollmentModel} from "../../models/enrollment.model";
import {AuthService} from "../../services/auth.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  id!: number;
  course!: Course;
  enrolled = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private enrollmentService: EnrollmentService,
              private courseService: CourseService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.course = new Course();
    this.id = this.route.snapshot.params['id'];

    this.courseService.getCourseById(this.id)
      .subscribe(data => {
        this.course = data;
      }, error => console.log(error));

    this.checkEnrollment();
  }

  checkEnrollment() {
    const enrollment = new EnrollmentModel();
    enrollment.courseId = this.id;
    enrollment.userId = sessionStorage.getItem("userId");

    this.enrollmentService.checkEnrollment(enrollment).subscribe(res => {
      this.enrolled = res;
    })
  }

  list() {
    if (this.id) {
      this.router.navigate([`${this.id}/module`]);
    } else {
      console.error('Cannot navigate to module without a valid ID.');
    }
  }

  subscribe() {
    if (!this.enrolled) {
      const enrollment = new EnrollmentModel();
      enrollment.courseId = this.id;
      enrollment.userId = sessionStorage.getItem("userId");

      this.enrollmentService.enrollmentCourse(enrollment).subscribe(
        (data) => {
          this.checkEnrollment();
          this.changeDetectorRef.detectChanges();
        },
        (error) => console.log(error)
      );
    } else {
      this.list();
    }
  }
}
