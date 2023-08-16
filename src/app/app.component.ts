import { Component, Inject, OnInit, effect, inject, signal } from '@angular/core';
import { AppStateInterface, IToken } from "./shared/interface/userAuth"
import { select, Store } from "@ngrx/store";
import { token } from "./core/store/Auth/selectors";
import * as AuthActions from "../app/core/store/Auth/actions";
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  timerSecs = signal(120);


  formatTimerSecs(val: any) {
    const min = String(Math.trunc(val / 60)).padStart(2, '0');
    const sec = String(val % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };


  token: IToken | null
  countDown: number

  store = inject(Store<AppStateInterface>);
  router = inject(Router)

  constructor() {

    this.store.pipe(select(token)).subscribe(x => {
      if (!x) return;
      this.autoLogout(x.exp)
    })
    // this.handleKeepSessionAlive()
  }


  // handleKeepSessionAlive() {
  //   ///This is a countdown for inactivity set for two minutes

  //   effect((onCleanup) => {
  //     const mytimer = setInterval(() => {
  //       this.timerSecs() > 0 && this.timerSecs.set(this.timerSecs() - 1)
  //     }, 1000)

  //     onCleanup(() => {
  //       clearInterval(mytimer);
  //     });

  //   }, { allowSignalWrites: true });


  //   effect(() => {
  //     if (this.timerSecs() === 0) this.logout()
  //   }, { allowSignalWrites: true })
  // }


  handleCheckActivity() {
    //set the timer back to 3mins
    this.timerSecs.set(180)
    // console.log('clicked')
  }

  autoLogout(exp: number) {
    let tokenExptimer;
    clearTimeout(tokenExptimer)

    const timeLeftInMs = exp * 1000 - Date.now()
    tokenExptimer = setTimeout(() => {
      this.logout()

    }, timeLeftInMs)
  }

  ngOnInit() {

  }


  logout() {
    this.store.dispatch(AuthActions.logout())
    this.router.navigate(["auth/login"])
  }
}
