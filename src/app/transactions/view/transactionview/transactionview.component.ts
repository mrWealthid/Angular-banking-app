import { Component, inject } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/interface/userAuth';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transactionview',
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.css']
})
export class TransactionviewComponent {

  transactionService= inject(TransactionService)
  transactionsDetails$: Observable<any>
  private store = inject(Store<AppStateInterface>)
  loading:boolean= false
  router= inject(Router)
  route = inject( ActivatedRoute)

  constructor() {
  const id =  this.route.snapshot.params['id']
 this.transactionsDetails$ = this.transactionService.getTransaction(id)
  }
  handleBack() {
    this.router.navigate(['/dashboard/transactions'])
        }
}
