import {Component, inject, OnInit} from '@angular/core';
import {TransactionService} from "./service/transaction.service";
import {globalizeDate} from "../shared/helpers/helperFunctions";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {Observable} from "rxjs";
import {PaymentService} from "../payments/service/payment.service";
import {ITableConfig} from "../shared/table/model/table-model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class TransactionsComponent implements OnInit {

  tableColumns = [
    {prop: 'initiatorName', name: 'Payer', searchType: 'text'},
    {prop: 'amount', name: 'Amount', pipe: "Currency", custom: true, searchType: 'number'},
    {prop: 'transactionType', name: 'Transaction', custom: true, searchType: 'dropdown', searchOptions:[
      {id: "Credit", name: 'Credit'},
      {id: "Debit", name: 'Debit'},
    ]},
    {prop: 'channel', name: 'Channel'},
    {prop: 'beneficiaryAccountNumber', name: 'Beneficiary Account', custom: true, searchType: 'number'},
    {prop: 'initiatorAccountNumber', name: 'Payer Account', custom: true, searchType: 'number'},
    {prop: 'createdAt', name: 'Time', pipe: "Date", searchType: 'Date'}
  ];

  service = inject(TransactionService)
  paymentService = inject(PaymentService)
  private store = inject(Store<AppStateInterface>)
  currentUser$: Observable<IProfile | null>;
  balance$: Observable<any>;
  tableConfig: ITableConfig = {
    showSummary: true,
    tableName: "Transactions Table"
  }


  ngOnInit(): void {

    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.balance$ = this.paymentService.getBalance()
  }

  handleAllSelection(rows: []) {
    console.log("I bubbled up", rows)
  }

  protected readonly globalizeDate = globalizeDate();
}
