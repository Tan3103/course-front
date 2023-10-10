import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.model";
import {Router} from "@angular/router";
import {CourseService} from "../../services/course.service";


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  course: Course = new Course();
  submitted = false;

  constructor(private courseService: CourseService,
              private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    if (this.course.description !== undefined && this.course.title !== undefined) {
      console.log(this.course.description)
      this.courseService.createCourse(this.course)
        .subscribe(data => console.log(data), error => console.log(error));
      this.course = new Course();
    }
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/home']);
  }

  gotoList2() {
    this.router.navigate(['/add']);
  }
}
