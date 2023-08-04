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
import { LoanViewComponent } from "../loans/view/loan-view/loan-view.component";
import { UsersViewComponent } from "../users/view/users-view/users-view.component";
import { TransactionComponent } from "../users/transaction/transaction.component";
import { UserLoanComponent } from "../users/user-loan/user-loan.component";

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
        path: 'users/:id',
        component: UsersViewComponent
      },

      {
        path: 'user-transactions/:id',
        component: TransactionComponent
      },

      {
        path: 'user-loans/:id',
        component: UserLoanComponent
      },
      
      {
        path: 'payments',
        component: PaymentsComponent
      }, {
        path: 'loans',
        component: LoansComponent
      }
      ,{
        path: 'loans/:id',
        component: LoanViewComponent
      }
    ]
  },
]
