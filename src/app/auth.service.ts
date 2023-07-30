import {inject, Injectable, signal} from '@angular/core';
import {ILogin, IRegister, IUser} from "./shared/interface/userAuth";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpContext} from "@angular/common/http";
import {BEARER_TOKEN} from "./headers.interceptor";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  storedRoutes: any[] = []

  router = inject(Router);
  private Http = inject(HttpClient)

  error = signal('')


  setError( message:string) {
    let timer;

    clearTimeout(timer)
    this.error.set(message)
 timer=  setTimeout(()=> {
//Clear Alert
      this.error.set('')
    }, 3000)
   
  }

  login(credentials: ILogin): Observable<IUser> {
    return this.Http.post<IUser>(`${environment.API_URL}/api/v1/users/login`, credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })

  }


  register(credentials: IRegister): Observable<IUser> {
    return this.Http.post<IUser>(`${environment.API_URL}/api/v1/users/signup`, credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })
  }


}
