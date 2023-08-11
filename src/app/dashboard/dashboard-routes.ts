import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { OverviewComponent } from "./overview/overview.component";
import { ProfileComponent } from "../profile/profile.component";
import { TransactionsComponent } from "../transactions/transactions.component";
import { PaymentsComponent } from "../payments/payments.component";
import { authGuard } from "../shared/services/guards/auth.guard";
import { UsersComponent } from "../users/users.component";
import { LoansComponent } from "../loans/loans.component";
import { TransactionviewComponent } from "../transactions/view/transactionview/transactionview.component";
import { LoanViewComponent } from "../loans/view/loan-view/loan-view.component";
import { UsersViewComponent } from "../users/view/users-view/users-view.component";
import { TransactionComponent } from "../users/transaction/transaction.component";
import { UserLoanComponent } from "../users/user-loan/user-loan.component";
import { roleGuard } from "../shared/services/guards/role.guard";
import { NotAuthorizedComponent } from "../shared/pages/not-authorized/not-authorized.component";

export const routes: Routes = [


  {
    path: '', component: DashboardComponent,
    canActivate: [authGuard],


    children: [

      { path: '', component: OverviewComponent, pathMatch: 'full' }, {
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
        component: UsersComponent,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'users/:id',
        component: UsersViewComponent,
        canActivate: [roleGuard('admin')],

      },

      {
        path: 'user-transactions/:id',
        component: TransactionComponent,
        canActivate: [roleGuard('admin')],
      },

      {
        path: 'user-loans/:id',
        component: UserLoanComponent,
        canActivate: [roleGuard('admin')],
      },

      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [roleGuard('user')],
      }, {
        path: 'loans',
        component: LoansComponent,

      }
      , {
        path: 'loans/:id',
        component: LoanViewComponent,

      },
      { path: 'notAuthorized', component: NotAuthorizedComponent }
    ],



  },


]
