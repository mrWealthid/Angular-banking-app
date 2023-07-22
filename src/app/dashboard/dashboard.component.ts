import {Component, inject, OnInit} from '@angular/core';
import {currentUserSelector} from "../core/store/Profile/selectors";
import {select, Store} from "@ngrx/store";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links = [
    {icon: "", path: '/dashboard', text: 'Overview'},
    {icon: "", path: 'profile', text: 'Profile'},
    {icon: "", path: 'transactions', text: 'Transactions'},
    {icon: "", path: 'payments', text: 'Payments'}
  ]
  isOpen: Boolean = false;
  private store = inject(Store<AppStateInterface>)
  currentUser$: Observable<IProfile | null>;


  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))

  }

  handleToggle() {

    this.isOpen = !this.isOpen

  }

  clickedOutside() {
    this.isOpen = false
  }


}
