import { Component, inject } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Observable } from 'rxjs';
import { AppStateInterface, IProfile } from 'src/app/shared/interface/userAuth';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { currentUserSelector } from 'src/app/core/store/Profile/selectors';

@Component({
  selector: 'app-transactionview',
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.css']
})
export class TransactionviewComponent {

  transactionService= inject(TransactionService)
  transactionsDetails$: Observable<any>
  private store = inject(Store<AppStateInterface>)
  currentUser: IProfile|null
  loading:boolean= false
  router= inject(Router)
  route = inject( ActivatedRoute)

  transactionDetails:any


  constructor() {

 this.transactionsDetails$ = this.transactionService.getTransaction(this.route.snapshot.params['id'])
 this.transactionsDetails$.subscribe(x=> this.transactionDetails = x)

this.store.pipe(select(currentUserSelector)).subscribe(x=> this.currentUser =x)
  }
  handleBack() {

if(this.currentUser?.role ==='admin') {
  this.router.navigate(['dashboard/user-transactions/', this.transactionDetails.user])
}
     else {
        this.router.navigate(['/dashboard/transactions'])
     }
       }
      
   
}
