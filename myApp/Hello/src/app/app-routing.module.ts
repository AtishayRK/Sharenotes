import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { ProfessorComponent } from './professor/professor.component';
import {RegisterComponent} from './register/register.component';
import { AuthguardService } from "./authguard.service";
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path :'',
    redirectTo : '/Home',
    pathMatch : 'full'
  },
  {
    path  :'login',
    component: LoginComponent
  },
  {
path :'Home',
component : HomeComponent
  },
  {
    path  :'student',
    component: StudentComponent
  }, {
    path  :'professor',
    component : ProfessorComponent,
    canActivate : [AuthguardService]
  },
  {
    path  :'register',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
