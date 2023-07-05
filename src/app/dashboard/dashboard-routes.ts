import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {ProfileComponent} from "../profile/profile.component";
import {TransactionsComponent} from "../transactions/transactions.component";
import {PaymentsComponent} from "../payments/payments.component";

export const routes: Routes = [


  {
    path: '', component: DashboardComponent,
    children: [

      {path: '', component: OverviewComponent, pathMatch: 'full'}, {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      }, {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      }
    ]
  },
]