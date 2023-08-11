import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppStateInterface, IProfile } from "../../interface/userAuth";
import { isAuthenticated } from "../../../core/store/Auth/selectors";
import { currentUserSelector } from "../../../core/store/Profile/selectors";
import { filter, forkJoin, map } from "rxjs";
import { AuthService } from "../../../auth/auth.service";

export const roleGuard = (role: 'user' | 'admin'): CanActivateFn => {

  const guard: CanActivateFn = (route, state) => {
    const isAuthenticated$ = inject(Store<AppStateInterface>).pipe(select(isAuthenticated))
    const currentUser$ = inject(Store<AppStateInterface>).pipe(select(currentUserSelector))
    const router = inject(Router)
    const requiredRole = role
    return currentUser$
      .pipe(filter((x) => x?.role !== undefined),
        map((x: any) => {
          if (!(requiredRole.includes(x?.role))) {
            router.navigate(['dashboard/notAuthorized'])
            return false;
          }


          return true
        }))
  }
  return guard
};


