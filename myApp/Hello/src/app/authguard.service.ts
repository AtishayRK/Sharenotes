import { Injectable } from '@angular/core';
import {UrlTree,Router,CanActivate} from '@angular/router';
import { AuthserviceService } from "./authservice.service";
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authservice : AuthserviceService,
    private router : Router) { }

    canActivate():  boolean{
        if(this.authservice.loggedIn())
        return true;
        else
        {
          this.router.navigate(['/login']);
          return false;
        }
    }
}
