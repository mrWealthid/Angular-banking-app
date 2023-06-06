import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../shared/interface/userAuth";
import {currentUserSelector} from "../core/store/Auth/selectors";

export const authGuard: CanActivateFn = (route, state) => {
  const store= inject(Store<AppStateInterface>);
  let isLoggedIn:boolean = false
  store.pipe(select(currentUserSelector)).subscribe(x =>  isLoggedIn = !!x)

//   if(isLoggedIn) {
//     return true
//   }
//   else {
// inject(Router).navigate(['login'])
//   }
  return isLoggedIn

};
