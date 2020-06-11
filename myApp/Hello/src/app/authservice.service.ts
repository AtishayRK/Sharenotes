import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable ,Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

   sharedData : string;
  private registerUri ="http://localhost:4000/apis/register";
  private loginUri="http://localhost:4000/apis/login";
  
  constructor(private http : HttpClient,
    private router : Router) { }

    registerUser(user)
    {
      
      return this.http.post<any>(this.registerUri,user);
    }
  
  loginUser(user)
    {
      return this.http.post<any>(this.loginUri,user);
    }
    loggedIn()
    {
      return !!localStorage.getItem('token');
    }
    gettoken()
    {
      return localStorage.getItem('token');
    }
    loggedOut()
    {
localStorage.removeItem('token');
localStorage.removeItem('user');
this.router.navigate(['/login']);
    }
    downloadPDF(filename, filetype): any {
      console.log(filetype);
      return this.http.get('http://localhost:4000/apis/file/' + filename,
      { responseType: 'blob' as 'json' });
    }
  
    showFileNames() {
      return this.http.get('http://localhost:4000/apis/files');
    }
    postNames(data)
    {
      console.log(data.name);
 return this.http.post("http://localhost:4000/apis/Names",data);
    }
    showdata()
    {
      return this.http.get("http://localhost:4000/apis/getnames");
    }
}
