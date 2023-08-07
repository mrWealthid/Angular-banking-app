import {inject, Injectable, signal} from '@angular/core';
import {ILogin, IRegister, IUser} from "../shared/interface/userAuth";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpContext} from "@angular/common/http";
import {BEARER_TOKEN} from "../headers.interceptor";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  storedRoutes: any[] = []

  router = inject(Router);
  private Http = inject(HttpClient)

  notification = signal({message: '', type: ''})


  setNotification( message:string, type:string) {
    let timer;

    clearTimeout(timer)
    this.notification.set({message, type})
 timer=  setTimeout(()=> {
//Clear Alert
      this.notification.set({message: '', type : ''})
    }, 8000)
   
  }

  clearError() {
    this.notification.set({message: '', type : ''})
  }

  login(credentials: ILogin): Observable<IUser> {
    return this.Http.post<IUser>(`${environment.API_URL}/api/v1/users/login`, credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })

  }
logout () {
  this.router.navigate(["auth/login"])
  this.storedRoutes = []
}
  


  register(credentials: IRegister): Observable<IUser> {
    return this.Http.post<IUser>(`${environment.API_URL}/api/v1/users/signup`, credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })
  }
  forgotPassword(email:string) {
    return this.Http.post<any>(`${environment.API_URL}/api/v1/users/forgotPassword`, email, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })
  }
  resetPassword(token:string, payload:IPasswordUpdate) {
    return this.Http.patch<any>(`${environment.API_URL}/api/v1/users/resetPassword/${token}`, payload, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })
  }


}

export interface IPasswordUpdate  {
  password: string,
  passwordConfirm: string
}
