import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CourseUpdateComponent} from "./components/course-update/course-update.component";
import {CourseCreateComponent} from "./components/course-create/course-create.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'course',
    loadChildren: () => import('./components/course-details/course-details.module').then(m => m.CourseDetailsModule)
  },
  {path: 'update/:id', component: CourseUpdateComponent},
  {path: 'add', component: CourseCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
