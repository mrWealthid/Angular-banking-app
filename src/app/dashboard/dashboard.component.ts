import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { currentUserSelector } from "../core/store/Profile/selectors";
import { select, Store } from "@ngrx/store";
import { AppStateInterface, IProfile } from "../shared/interface/userAuth";
import { Observable } from "rxjs";
import * as AuthActions from "../core/store/Auth/actions";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links = [
    { icon: "", path: '/dashboard', text: 'Overview' },
    { icon: "", path: 'profile', text: 'Profile' },
    { icon: "", path: 'transactions', text: 'Transactions' },
    { icon: "", path: 'payments', text: 'Payments' }
  ]
  isOpen: Boolean = false;
  private store = inject(Store<AppStateInterface>)
  currentUser$: Observable<IProfile | null>;
  router = inject(Router)


  timerSecs = signal(120);


  formatTimerSecs(val: any) {
    const min = String(Math.trunc(val / 60)).padStart(2, '0');
    const sec = String(val % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))

  }


  constructor() {
    this.handleKeepSessionAlive()
  }


  handleCheckActivity() {
    //set the timer back to 3mins
    this.timerSecs.set(180)
    // console.log('clicked')
  }


  handleKeepSessionAlive() {
    ///This is a countdown for inactivity set for two minutes

    effect((onCleanup) => {
      const mytimer = setInterval(() => {
        this.timerSecs() > 0 && this.timerSecs.set(this.timerSecs() - 1)
      }, 1000)

      onCleanup(() => {
        clearInterval(mytimer);
      });

    }, { allowSignalWrites: true });


    effect(() => {
      if (this.timerSecs() === 0) this.logout()
    }, { allowSignalWrites: true })
  }

  handleToggle() {

    this.isOpen = !this.isOpen

  }

  clickedOutside() {
    this.isOpen = false
  }


  logout() {
    this.store.dispatch(AuthActions.logout())
    this.router.navigate(["auth/login"])
  }

}
