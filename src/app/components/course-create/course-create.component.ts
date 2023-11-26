import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  course: Course = new Course();
  submitted = false;
  courseForm!: FormGroup;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: '',
      description: '',
      language: '',
      moduleList: this.formBuilder.array([]),
    });
  }

  get moduleControls() {
    return this.courseForm.get('moduleList') as FormArray;
  }

  addModule() {
    const moduleGroup = this.formBuilder.group({
      title: '',
      description: '',
      materialList: this.formBuilder.array([]),
    });
    this.moduleControls.push(moduleGroup);
  }

  get materialControls() {
    return (this.moduleControls.controls[
    this.moduleControls.length - 1
      ] as FormGroup).get('materialList') as FormArray;
  }

  addMaterial() {
    const materialGroup = this.formBuilder.group({
      title: '',
      content: '',
      type: '',
    });
    this.materialControls.push(materialGroup);
  }

  onSubmit() {
    const formData = this.courseForm.value as Course;

    // Optionally, you can set other properties like price, quizCount, etc.
    formData.price = '100';

    // Send formData to the server or perform other necessary logic
    console.log(formData);

    this.courseService.createCourse(formData).subscribe(
      (data) => {
        console.log(data);
        // Optionally, navigate to a different route after successful submission
        this.router.navigate(['/courses']);
      },
      (error) => console.log(error)
    );
  }
}
