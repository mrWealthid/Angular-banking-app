import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {ProfileComponent} from "../profile/profile.component";
import {TransactionsComponent} from "../transactions/transactions.component";
import {PaymentsComponent} from "../payments/payments.component";
import {authGuard} from "../shared/services/guards/auth.guard";
import {UsersComponent} from "../users/users.component";
import {LoansComponent} from "../loans/loans.component";
import { TransactionviewComponent } from "../transactions/view/transactionview/transactionview.component";

export const routes: Routes = [


  {
    path: '', component: DashboardComponent,
    canActivate: [authGuard],
    children: [

      {path: '', component: OverviewComponent, pathMatch: 'full'}, {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      }, {
        path: 'transactions',
        component: TransactionsComponent
      }, {
        path: 'transactions/:id',
        component: TransactionviewComponent
      }, {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      }, {
        path: 'loans',
        component: LoansComponent
      }
    ]
  },
]
