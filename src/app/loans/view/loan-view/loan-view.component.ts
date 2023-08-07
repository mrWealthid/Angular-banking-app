import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoansService } from '../../service/loans.service';
import { Observable } from 'rxjs';
import { AppStateInterface, IProfile } from 'src/app/shared/interface/userAuth';
import { Store, select } from '@ngrx/store';
import { currentUserSelector } from 'src/app/core/store/Profile/selectors';
import { ITableConfig } from 'src/app/shared/table/model/table-model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-loan-view',
  templateUrl: './loan-view.component.html',
  styleUrls: ['./loan-view.component.css']
})
export class LoanViewComponent {

    route = inject( ActivatedRoute)

currentUser$: Observable<IProfile|null>

    loanService= inject(LoansService)
    loanDetails$: Observable<any>
    private store = inject(Store<AppStateInterface>)
    loading:boolean= false
    router= inject(Router)
    private notify = inject(NotificationService)
    currentUser:IProfile|null
    loanDetails: any

  

    constructor() {
 
   this.loanDetails$ = this.loanService.getLoan(this.route.snapshot.params['id'])

   this.loanDetails$.subscribe(x=> this.loanDetails = x)


   this.currentUser$ = this.store.pipe(select(currentUserSelector))

   this.currentUser$.subscribe(x=> this.currentUser = x)

    }


    handleProcessLoan(val:any, loanId:any) {
      this.loading = true
      this.loanService.processLoan(val, loanId).subscribe(x => {
        this.loading = false
        this.handleBack()
        this.notify.showSuccess('Loan Processed Ok','Loan Notification')
      }, err=>{
        this.loading = false
      })
    }


    handleLoanPayment(){

    }


    handleRetry() {

    }
    handleWithdrawal(loanId:AnyCatcher){
      this.loading = true
      this.loanService.withdrawLoan(loanId).subscribe(x => {
        this.loading = false
        this.handleBack()
        this.notify.showSuccess('Loan Withdrawn','Loan Notification')
      }, err=>{
        this.loading = false
    
      })

    }

    handleBack() {


      if(this.currentUser?.role ==='admin') {
        this.router.navigate(['dashboard/user-loans/', this.loanDetails.user ])
      }
      else{
this.router.navigate(['/dashboard/loans'])
      }
    }

}
