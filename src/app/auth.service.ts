import {inject, Injectable} from '@angular/core';
import {ILogin, IRegister, IUser} from "./shared/interface/userAuth";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpContext} from "@angular/common/http";
import {BEARER_TOKEN} from "./headers.interceptor";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  storedRoutes: any[] = []

  router = inject(Router);
  private Http = inject(HttpClient)


  login(credentials: ILogin): Observable<IUser> {
    return this.Http.post<IUser>('www.google/api/v1/users/login', credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })

  }


  register(credentials: IRegister): Observable<IUser> {
    return this.Http.post<IUser>('/api/v1/users/signup', credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })
  }


}
