import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {Router} from "@angular/router";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {isAuthenticated} from "../core/store/Auth/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: Observable<IProfile | null>;
  isAuthenticated: Observable<boolean>;

  constructor(private router: Router, public store: Store<AppStateInterface>) {
    this.isAuthenticated = this.store.pipe(select(isAuthenticated))
    this.currentUser = this.store.pipe(select(currentUserSelector))
  }

  ngOnInit(): void {
  }

}
