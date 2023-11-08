import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.model";
import {CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  id!: number;
  course!: Course;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService) {
  }

  ngOnInit() {
    this.course = new Course();

    this.id = this.route.snapshot.params['id'];

    this.courseService.getCourseById(this.id)
      .subscribe(data => {
        console.log(data)
        this.course = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['home']);
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id)
      .subscribe(
        data => {
          console.log(data);
          this.list();
        },
        error => console.log(error));
  }

  updateCourse(id: number) {
    this.router.navigate(['update', id]);
  }
}
