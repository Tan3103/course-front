import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../models/course.model";
import {CourseService} from "../../services/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses!: Course[];

  constructor(private courseService: CourseService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.courseService.getAll().subscribe(res => {
      this.courses = res
    })
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  courseDetails(id: bigint) {
    this.router.navigate(['course', id]);
  }

  updateCourse(id: number) {
    this.router.navigate(['update', id]);
  }
}
