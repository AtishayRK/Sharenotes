  import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../authservice.service';
import {Router} from '@angular/router';
import {profile} from '../profile';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
profile :profile
name : string;
role : string;
password : string;
  constructor(private auth : AuthserviceService,
    private router : Router) { 
      

    }
    ngOnInit() {
     
    }
 
    loginUser(){

      const loginUserData ={
        name: this.name ,
        password:this.password,
        role : this.role
     
      }
      localStorage.setItem('user',this.name);
      if(this.role==="student")
         {
       
         
         this.auth.loginUser(loginUserData).subscribe(
           res=>{
             console.log(res),
             localStorage.setItem('token',res.token),
             this.router.navigate(['/student']);
           },
           err=>console.log(err)
         )
        
       }
       else if(this.role==="professor")
       {
        
         this.auth.loginUser(loginUserData).subscribe(
           res=>{
             console.log(res),
             localStorage.setItem('token',res.token),
            
            
             this.router.navigate(['/professor']);
           },
           err=>console.log(err)
         )
         
         
       }
       else
       {
         alert("role field should be professor or student..Field is case sensitive");
       }
     }
 

}