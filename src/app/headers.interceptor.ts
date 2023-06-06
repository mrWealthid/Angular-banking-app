import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpContextToken, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscription, throwError} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {token} from "./core/store/Auth/selectors";
import {AppStateInterface} from "./shared/interface/userAuth";
import {catchError} from "rxjs/operators";


export const BEARER_TOKEN = new HttpContextToken(() => true);

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  token$: Observable<any>

  constructor(public store: Store<AppStateInterface>) {
    this.token$ = this.store.pipe(select(token));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token;
    if (!request.context.get(BEARER_TOKEN)) {
      return next.handle(request);
    }

    this.token$.subscribe(x => token = x)
    let jsonRequest: HttpRequest<any> = request.clone({
      // setHeaders: {'Content-Type': request.context.get(CONTENT_TYPE)}
      setHeaders: {
        'Content-Type': "Wealth",
        "Authorization": `Bearer ${token}`
      }
    });

    return next.handle(jsonRequest).pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      if(err.status ===401) {
        console.log('refresh token')
      }
      return throwError(err);


    }))

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
