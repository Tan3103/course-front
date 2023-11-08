import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.model";
import {Router} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  course: Course = new Course();
  submitted = false;
  courseForm!: FormGroup;

  constructor(private courseService: CourseService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  // onSubmit() {
  //   console.log(this.courseForm)
  //   if (this.courseForm !== undefined) {
  //     this.courseService.createCourse(this.courseForm)
  //       .subscribe(data => console.log(data), error => console.log(error));
  //     this.course = new Course();
  //   }
  // }s

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: '',
      description: '',
      language: '',
      materialList: this.formBuilder.array([])
    });
  }

  get materialControls() {
    return (this.courseForm.get('materialList') as FormArray);
  }

  addMaterial() {
    const materialGroup = this.formBuilder.group({
      title: '',
      content: '',
      type: ''
    });
    this.materialControls.push(materialGroup);
  }

  onSubmit() {
    const title = this.courseForm.get('title');
    const description = this.courseForm.get('description');
    const language = this.courseForm.get('language');
    const materialList = this.courseForm.get('materialList');

    if (title && description && language && materialList) {
      const formData = {
        title: title.value,
        description: description.value,
        language: language.value,
        materialList: materialList.value
      };

      // Отправьте formData на сервер или выполните другую необходимую логику
      console.log(formData);

      this.courseService.createCourse(formData).subscribe(data => console.log(data), error => console.log(error));
    }
  }

}
