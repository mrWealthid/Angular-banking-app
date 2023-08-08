import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppStateInterface } from "../../interface/userAuth";
import { isAuthenticated } from "../../../core/store/Auth/selectors";
import { filter, map } from "rxjs";
import { AuthService } from "../../../auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated$ = inject(Store<AppStateInterface>).pipe(select(isAuthenticated))
  const router = inject(Router)
  const authService = inject(AuthService)

  let url: any[] = [];
  console.log(url);
  authService.storedRoutes.push(state.url)

  console.log(authService.storedRoutes)


  return isAuthenticated$.pipe(filter((x) => x != undefined), map((x) => {

    console.log(x)
    if (!x) {
      router.navigate(['auth/login'])
      return false;
    }

    // router.navigate([authService.storedRoutes[0]])
    return true
  }))

};
