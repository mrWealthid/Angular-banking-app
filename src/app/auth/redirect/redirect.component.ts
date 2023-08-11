import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/interface/userAuth';
import * as AuthActions from "../../core/store/Auth/actions";
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements AfterViewInit {

  token: any
  route = inject(ActivatedRoute)
  router = inject(Router)
  private store = inject(Store<AppStateInterface>)

  constructor() {
    this.token = this.route.snapshot.queryParamMap.get('token')

    console.log(this.token)
    this.store.dispatch(AuthActions.loginSuccess({
      currentUser: { token: this.token }
    }))

    this.store.dispatch(AuthActions.profileLookup())

  }

  ngAfterViewInit(): void {
    this.router.navigate([], {
      queryParams: {
        'token': null,
      },
      queryParamsHandling: 'merge'
    })
  }

}
