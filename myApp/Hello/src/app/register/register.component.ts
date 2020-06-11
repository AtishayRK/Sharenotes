import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../authservice.service';
import {AuthguardService} from '../authguard.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name : string;
  role : string;
  password : string;
  constructor(private auth : AuthserviceService,
    private guard : AuthguardService,
    private router : Router) { }

  ngOnInit() {
  }
  registerUser()
  {
    const registerUserData ={
      name: this.name ,
      password:this.password,
      role : this.role
   
    }
    this.auth.sharedData=this.name;
    if(this.role==="student")
    {
    this.auth.registerUser(registerUserData).subscribe(
      res=>{
        console.log(res),
        localStorage.setItem('token',res.token),
        this.router.navigate(['/student']);
      },
      err=>console.log(err)   
    )
    }
    else
    {
      this.auth.registerUser(registerUserData).subscribe(
        res=>{
          console.log(res),
          localStorage.setItem('token',res.token),
          this.router.navigate(['/professor']);
        },
        err=>console.log(err)   
      )
    }
  }

}
