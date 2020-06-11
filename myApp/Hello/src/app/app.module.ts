import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './authservice.service';
import { AuthguardService } from './authguard.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    ProfessorComponent,
    StudentComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [AuthserviceService,AuthguardService,
    {
      provide : HTTP_INTERCEPTORS,
  useClass  : TokeninterceptorService,
  multi : true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
