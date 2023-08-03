import {NgModule} from '@angular/core';
import {TransactionsComponent} from "../transactions/transactions.component";
import {ProfileComponent} from "../profile/profile.component";
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {PaymentsComponent} from "../payments/payments.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {routes} from "./dashboard-routes";
import {UsersComponent} from "../users/users.component";
import {LoansComponent} from "../loans/loans.component";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoanViewComponent } from '../loans/view/loan-view/loan-view.component';
import { TransactionviewComponent } from '../transactions/view/transactionview/transactionview.component';
import { UsersViewComponent } from '../users/view/users-view/users-view.component';
import { TransactionComponent } from '../users/transaction/transaction.component';


@NgModule({
  declarations: [
    TransactionsComponent,

    ProfileComponent,
    DashboardComponent,
    UsersComponent,
    OverviewComponent,
    PaymentsComponent,
    LoansComponent,  TransactionviewComponent,
    LoanViewComponent,
    UsersViewComponent,
    TransactionComponent,
  ],
  imports: [
    SharedModule, CommonModule, FormsModule, ReactiveFormsModule,
    
    RouterModule.forChild(routes), NgOptimizedImage,  NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rotatingPlane,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#111827FF",
      secondaryColour: "red",
      tertiaryColour: "blue",
    }),
  ]
})
export class DashboardModule {
}
