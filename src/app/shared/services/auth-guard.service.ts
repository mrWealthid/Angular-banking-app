import {inject} from '@angular/core';
import {Router} from "@angular/router";
import {filter, map} from "rxjs";
import {AppStateInterface} from "../interface/userAuth";
import {select, Store} from "@ngrx/store";
import {isAuthenticated} from "../../core/store/Auth/selectors";


export const authGuard = () => {
  const isAuthenticated$ = inject(Store<AppStateInterface>).pipe(select(isAuthenticated))
  const router = inject(Router)

  return isAuthenticated$.pipe(filter((x) => x != undefined), map((x) => {
    if (!x) {
      router.navigate(['auth/login'])
      return false;
    }
    return true
  }))

}
