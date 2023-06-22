import {Component, OnInit} from '@angular/core';
import {AppStateInterface, IToken} from "../app/shared/interface/userAuth"
import {select, Store} from "@ngrx/store";
import {token} from "./core/store/Auth/selectors";
import * as AuthActions from "../app/core/store/Auth/actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wallet';

  // appState$: Observable<AuthState>;
  // private token: Observable<String | null>;
  token: IToken | null

  constructor(private store: Store<AppStateInterface>, private router: Router) {
    this.store.pipe(select(token)).subscribe(x => {


      if (!x) return;
      this.autoLogout(x.exp)
    })
  }


  autoLogout(exp: any) {
    const timeLeftInMs = exp * 1000 - Date.now()

    console.log(timeLeftInMs)
    setTimeout(() => {
        this.store.dispatch(AuthActions.logout())
        this.router.navigate(["login"])
      }, timeLeftInMs
    )
  }

  ngOnInit() {

  }
}
