import {Route} from '@angular/router';
import {CourseDetailsComponent} from "./course-details.component";
import {CourseModuleComponent} from "./course-module/course-module.component";

export const courseDetailsRouting: Route[] = [
  {
    path: ':id',
    component: CourseDetailsComponent
  },
  {
    path: ':id/module',
    component: CourseModuleComponent
  }
];
