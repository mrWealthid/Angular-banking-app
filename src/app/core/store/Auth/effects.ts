import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../auth/auth.service";
import {catchError} from "rxjs/operators";
import {ILogin, IRegister} from "../../../shared/interface/userAuth";
import {profileLookup} from "../Profile/actions";

@Injectable()
export class AuthEffect {

  private AuthService = inject(AuthService);
  private actions$ = inject(Actions);


  register$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.register), switchMap((credentials: IRegister) => {
      return this.AuthService.register(credentials)
        .pipe(switchMap((newUser) => {
          return [AuthActions.registerSuccess({newUser}), profileLookup()
          ]
        }), catchError(error => of(AuthActions.registerFailure({
          error: error.message
        })).pipe(tap(() => {
this.AuthService.setNotification(error.error.message||error.message, 'error')
        
        }))));
    }))
  );
  login$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.login),
      switchMap(((credentials: ILogin) => {
        return this.AuthService.login(credentials).pipe(
          switchMap((currentUser) => {
            return [AuthActions.loginSuccess({currentUser}), profileLookup()
            ]
          }), catchError(error => of(AuthActions.loginFailure({
            error: error.error.message
          })).pipe(tap(() => {
          this.AuthService.setNotification(error.error.message || error.message, 'error')
          }))))
      }))
    ))
  ;
}

