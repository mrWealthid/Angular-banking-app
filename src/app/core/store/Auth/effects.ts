import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {map, mergeMap, of, switchMap} from "rxjs";
import {AuthService} from "../../../auth.service";
import {catchError} from "rxjs/operators";
import {ILogin, IProfile, IRegister, IUser} from "../../../shared/interface/userAuth";
import {profileLookup} from "./actions";

@Injectable()
export class AuthEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.register), mergeMap((credentials: IRegister) => {
      return this.AuthService.register2(credentials)
        .pipe(map((newUser: IUser) => AuthActions.registerSuccess({newUser})), catchError(error => of(AuthActions.registerFailure({
          error: error.message
        }))));


    }))
  );
  login$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.login),
      switchMap(((credentials: ILogin) => {
        return this.AuthService.login2(credentials).pipe(
          switchMap((currentUser)=> {
            return [AuthActions.loginSuccess({currentUser}), profileLookup()
            ]
          }), catchError(error => of(AuthActions.loginFailure({
          error: error.message
        }))));
      }))
    ))
  ;

 profile$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.login),
      mergeMap(() => {
        return this.AuthService.fetchProfile().pipe(map((newUser: IProfile) => AuthActions.profileLookupSuccess({newUser})), catchError(error => of(AuthActions.profileLookupFailure({
          error: error.message
        }))));
      }))
  );

  constructor(private actions$: Actions, private AuthService: AuthService) {
  }
}

