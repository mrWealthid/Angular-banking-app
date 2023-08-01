import {Component, inject, OnInit} from '@angular/core';
import * as AuthActions from "../core/store/Auth/actions";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {isAuthenticated} from "../core/store/Auth/selectors";
import {Observable} from "rxjs";
import {currentUserSelector} from "../core/store/Profile/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Observable<boolean>;
  currentUser: Observable<IProfile | null>;
  private router = inject(Router)
  private store = inject(Store<AppStateInterface>)


  ngOnInit(): void {
    this.isAuthenticated = this.store.pipe(select(isAuthenticated))
    this.currentUser = this.store.pipe(select(currentUserSelector))
  
  }


  logout() {
    this.store.dispatch(AuthActions.logout())
    this.router.navigate(["auth/login"])
  }


}
