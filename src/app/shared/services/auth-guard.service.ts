import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";
import {AppStateInterface} from "../interface/userAuth";
import {Store} from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<AppStateInterface>) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(route);
        console.log(state.url);
        if (this.authService.isLoggedIn) {
            return true;
        }
        // navigate to login page
        this.router.navigate(['/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }
}
