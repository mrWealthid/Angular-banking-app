import { Component, inject, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/core/store/Profile/selectors';
import { PaymentService } from 'src/app/payments/service/payment.service';
import { AppStateInterface, IProfile } from 'src/app/shared/interface/userAuth';
import { ITableConfig } from 'src/app/shared/table/model/table-model';
import { TransactionService } from 'src/app/transactions/service/transaction.service';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  userId: any

  tableColumns = [
    {prop: 'initiatorName', name: 'Payer', searchType: 'text'},
    {prop: 'amount', name: 'Amount', pipe: "Currency", custom: true, searchType: 'number'},
    {prop: 'transactionType', name: 'Transaction', custom: true, searchType: 'dropdown',  selectOptions:[
      {id: "Credit", name: 'Credit'},
      {id: "Debit", name: 'Debit'},
    ]},
    {prop: 'channel', name: 'Channel'},
    {prop: 'beneficiaryAccountNumber', name: 'Beneficiary Account', custom: true, searchType: 'number'},
    {prop: 'initiatorAccountNumber', name: 'Payer Account', custom: true, searchType: 'number'},
    {prop: 'createdAt', name: 'Time', pipe: "Date", searchType: 'Date'}
  ];


  tableConfig:ITableConfig

  constructor() {
    this.userId =  this.route.snapshot.params['id']
    this.tableConfig = {
      showSummary: true,
      tableName: "Transactions Table",
      singleAction:true,
      searchParams: {userId: this.userId}
      // actionable:false
    }
     }
  service = inject(UserService)
  paymentService = inject(PaymentService)
  private store = inject(Store<AppStateInterface>)
  currentUser$: Observable<IProfile| null>;

  balance= signal<number>(0)
 
  route = inject( ActivatedRoute)
  

  
  ngOnInit(): void {

    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  this.fetchBalance()
  }

  fetchBalance() {
    this.paymentService.getBalance().subscribe(x=> 
      this.balance.set(x))
  }


  handleAllSelection(rows: any[]) {
    console.log("I bubbled up", rows)
  }


}
