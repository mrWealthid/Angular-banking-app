import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {of, switchMap} from "rxjs";
import {AuthService} from "../../../auth.service";
import {catchError} from "rxjs/operators";
import {ILogin, IRegister} from "../../../shared/interface/userAuth";
import {profileLookup} from "../Profile/actions";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffect {

  register$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.register), switchMap((credentials: IRegister) => {
      return this.AuthService.register2(credentials)
        .pipe(switchMap((newUser) => {
          return [AuthActions.registerSuccess({newUser}), profileLookup()
          ]
        }), catchError(error => of(AuthActions.registerFailure({
          error: error.message
        }))));


    }))
  );
  login$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.login),
      switchMap(((credentials: ILogin) => {
        return this.AuthService.login2(credentials).pipe(
          switchMap((currentUser) => {
            return [AuthActions.loginSuccess({currentUser}), profileLookup()
            ]
          }), catchError(error => of(AuthActions.loginFailure({
            error: error.message
          }))));
      }))
    ))
  ;

  // profile$ = createEffect(() =>
  //    this.actions$.pipe(ofType(AuthActions.profileLookup),
  //      mergeMap(() => {
  //        return this.AuthService.fetchProfile().pipe(map((newUser: IProfile) => AuthActions.profileLookupSuccess({newUser})), tap(()=> this.router.navigate(['dashboard'])), catchError(error => of(AuthActions.profileLookupFailure({
  //          error: error.message
  //        }))));
  //      }))
  //  );

  constructor(private actions$: Actions, private AuthService: AuthService, private router: Router) {
  }
}

