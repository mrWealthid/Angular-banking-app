import {Component, OnInit, OnChanges} from '@angular/core';
import {AuthService} from "../auth.service";
import {DatabaseService} from "../shared/services/database.service";
import * as AuthActions from "../core/store/Auth/actions";
import {AppStateInterface, IProfile, IUser} from "../shared/interface/userAuth";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {errorSelector, isAuthenticated, isLoadingSelector} from "../core/store/Auth/selectors";
import { Observable} from "rxjs";
import {SimpleChanges} from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

   isAuthenticated;



    constructor(public authService: AuthService, private router:Router, public store:Store<AppStateInterface>) {

      this.isAuthenticated = this.store.pipe(select(isAuthenticated))



    }

    ngOnChanges(changes: SimpleChanges) {
      console.log('xxx')
    }

  ngOnInit(): void {
    }



    logout() {

      this.store.dispatch(AuthActions.logout())
      this.router.navigate(["login"])

        // this.authService.logout();
    }


}
