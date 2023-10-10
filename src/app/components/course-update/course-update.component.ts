import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {

  id: number = 0;
  course: Course = new Course();

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

  updateEmployee() {
    this.courseService.updateCourse(this.id, this.course)
      .subscribe(data => {
        console.log(data);
        this.course = new Course();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/home']);
  }
}
