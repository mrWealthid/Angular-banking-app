import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppStateInterface, AuthState} from "../app/shared/interface/userAuth"
import {Store, select} from "@ngrx/store";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Wallet';

  // appState$: Observable<AuthState>;
    ngOnInit() {
    }

    constructor(private store: Store<AppStateInterface>) {
      // this.appState$ = this.store.pipe(select('Auth'));

    }
}
