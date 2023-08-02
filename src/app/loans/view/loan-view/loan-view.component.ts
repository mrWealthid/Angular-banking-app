import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoansService } from '../../service/loans.service';
import { Observable } from 'rxjs';
import { AppStateInterface, IProfile } from 'src/app/shared/interface/userAuth';
import { Store, select } from '@ngrx/store';
import { currentUserSelector } from 'src/app/core/store/Profile/selectors';

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


    constructor() {
    const id =  this.route.snapshot.params['id']
   this.loanDetails$ = this.loanService.getLoan(id)


   this.currentUser$ = this.store.pipe(select(currentUserSelector))
    }


    handleProcessLoan(val:any) {
      this.loading = true
      this.loanService.processLoan(val).subscribe(x => {
        this.loading = false
      }, err=>{
        this.loading = false
      })
    }


    handleLoanPayment(){

    }


    handleRetry() {

    }
    handleWithdrawal(){

    }

    handleBack() {
this.router.navigate(['/dashboard/loans'])
    }

}
