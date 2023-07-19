import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./actions";
import {map, mergeMap, of, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {IProfile} from "../../../shared/interface/userAuth";
import {Router} from "@angular/router";
import {ProfileService} from "../../../profile/service/profile.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {AuthService} from "../../../auth.service";

@Injectable()
export class ProfileEffect {
  private authService = inject(AuthService);
  private Notify = inject(NotificationService);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private actions$ = inject(Actions);
  profilePasswordUpdate$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profilePasswordUpdate),
      switchMap((payload) => {
        return this.profileService.updatePassword(payload).pipe(map((updateCredentials) => AuthActions.profilePasswordUpdateSuccess({updateCredentials})), tap(() => this.profileService.updateSteps(2)), catchError(error => of(AuthActions.profilePasswordUpdateFailure({
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
  profile$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.profileLookup),
      mergeMap(() => {
        return this.profileService.fetchProfile().pipe(map((newUser: IProfile) => AuthActions.profileLookupSuccess({newUser})), tap(() => {
          this.checkForPrevRoute(this.authService.storedRoutes) ?
            this.router.navigate([this.authService.storedRoutes[0]]) : this.router.navigate(['dashboard'])

        }), catchError(error => of(AuthActions.profileLookupFailure({
          error: error.message
        }))));
      }))
  );


  checkForPrevRoute(url: any[]) {
    return url.length > 0;

  }
}

