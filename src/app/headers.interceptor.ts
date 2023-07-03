import {Injectable} from '@angular/core';
import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {token} from "./core/store/Auth/selectors";
import {AppStateInterface} from "./shared/interface/userAuth";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import * as AuthActions from "./core/store/Auth/actions";


export const BEARER_TOKEN = new HttpContextToken(() => true);
export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  token$: Observable<any>

  constructor(public store: Store<AppStateInterface>, private router: Router) {
    this.token$ = this.store.pipe(select(token));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token
    if (!request.context.get(BEARER_TOKEN)) {
      return next.handle(request);
    }

    this.token$.subscribe(x => token = x?.key)
    let jsonRequest: HttpRequest<any> = request.clone({
      // setHeaders: {'Content-Type': request.context.get(CONTENT_TYPE)}
      setHeaders: {

        "Authorization": `Bearer ${token}`
      }
    });

    return next.handle(jsonRequest).pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      if (err.status === 401) {
        console.log('refresh token')
        this.logout()
      }
      return throwError(err)
    }))
  }


  logout() {

    this.store.dispatch(AuthActions.logout())
    this.router.navigate(["auth/login"])

    // this.authService.logout();
  }


  appendToken(req: HttpRequest<any>) {
    this.token$.subscribe(token => {
      console.log(token)
      return req.clone({
        // setHeaders: {'Content-Type': request.context.get(CONTENT_TYPE)}
        setHeaders: {
          "Authorization": `Bearer ${token}`
        }
      })
    });

  }
}
