import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {DatabaseService} from "../shared/services/database.service";
import * as AuthActions from "../core/store/Auth/actions";
import {AppStateInterface} from "../shared/interface/userAuth";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(public authService: AuthService, public store:Store<AppStateInterface>) {
    }

    ngOnInit(): void {
    }

    logout() {

      this.store.dispatch(AuthActions.logout())
        // this.authService.logout();
    }
}
