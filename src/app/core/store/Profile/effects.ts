import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {map, mergeMap, of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../auth.service";
import {catchError} from "rxjs/operators";
import {IProfile} from "../../../shared/interface/userAuth";
import {Router} from "@angular/router";
import {ProfileService} from "../../../profile/profile.service";
import {NotificationService} from "../../../shared/services/notification.service";

@Injectable()
export class ProfileEffect {


  profile$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profileLookup),
      mergeMap(() => {
        return this.profileService.fetchProfile().pipe(map((newUser: IProfile) => AuthActions.profileLookupSuccess({newUser})), tap(() => this.router.navigate(['dashboard'])), catchError(error => of(AuthActions.profileLookupFailure({
          error: error.message
        }))));
      }))
  );


  profileUpdate$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profileUpdate),
      switchMap((payload) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('photo', payload.photo)
        return this.profileService.updateUser(formData).pipe(map((updateUser: IProfile) => AuthActions.profileUpdateSuccess({updateUser})), tap(() => this.profileService.updateSteps(1)), catchError(error => of(AuthActions.profileUpdateFailure({
          error: error.message
        })).pipe(tap(() => {
          this.Notify.showError(error.statusText, "Auth Error")
        }))));
      }))
  );

  profilePasswordUpdate$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profilePasswordUpdate),
      switchMap((payload) => {
        return this.profileService.updatePassword(payload).pipe(map((updateCredentials) => AuthActions.profilePasswordUpdateSuccess({updateCredentials})), tap(() => this.profileService.updateSteps(2)), catchError(error => of(AuthActions.profilePasswordUpdateFailure({
          error: error.message
        }))));
      }))
  );


  constructor(private actions$: Actions, private authService: AuthService, private profileService: ProfileService, private router: Router, private Notify: NotificationService) {
  }
}

