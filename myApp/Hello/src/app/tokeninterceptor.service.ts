import { Injectable ,Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthserviceService} from './authservice.service'
@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }
  intercept(req,next){
 let authservice= this.injector.get(AuthserviceService);
 let tokenizedreq= req.clone({
   setHeaders :{
     authorization : `Bearer ${authservice.gettoken()}`
   }
 })
 return next.handle(tokenizedreq);
  }
}
