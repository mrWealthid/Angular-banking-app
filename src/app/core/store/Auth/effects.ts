import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../auth.service";
import {catchError} from "rxjs/operators";
import {ILogin, IRegister} from "../../../shared/interface/userAuth";
import {profileLookup} from "../Profile/actions";
import {NotificationService} from "../../../shared/services/notification.service";

@Injectable()
export class AuthEffect {

  private AuthService = inject(AuthService);
  private actions$ = inject(Actions);
  private Notify = inject(NotificationService);

  register$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.register), switchMap((credentials: IRegister) => {
      return this.AuthService.register(credentials)
        .pipe(switchMap((newUser) => {
          return [AuthActions.registerSuccess({newUser}), profileLookup()
          ]
        }), catchError(error => of(AuthActions.registerFailure({
          error: error.message
        })).pipe(tap(() => {
          this.Notify.showError(error.statusText, "Auth Error")
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
            error: error.message
          })).pipe(tap(() => {
            this.Notify.showError(error.statusText, "Auth Error")
          }))))
      }))
    ))
  ;
}

