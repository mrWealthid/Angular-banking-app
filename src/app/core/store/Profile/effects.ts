import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {concatMap, map, mergeMap, of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../auth.service";
import {catchError} from "rxjs/operators";
import {ILogin, IProfile, IRegister, IUser} from "../../../shared/interface/userAuth";
import {profileLookup} from "./actions";
import {Router} from "@angular/router";

@Injectable()
export class ProfileEffect {



 profile$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profileLookup),
      mergeMap(() => {
        return this.AuthService.fetchProfile().pipe(map((newUser: IProfile) => AuthActions.profileLookupSuccess({newUser})), tap(()=> this.router.navigate(['dashboard'])), catchError(error => of(AuthActions.profileLookupFailure({
          error: error.message
        }))));
      }))
  );

  constructor(private actions$: Actions, private AuthService: AuthService, private router: Router) {
  }
}

