import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from "./service/transaction.service";
import { globalizeDate } from "../shared/helpers/helperFunctions";
import { AppStateInterface, IProfile } from "../shared/interface/userAuth";
import { select, Store } from "@ngrx/store";
import { currentUserSelector } from "../core/store/Profile/selectors";
import { Observable, of } from "rxjs";
import { PaymentService } from "../payments/service/payment.service";
import { ITableConfig } from "../shared/table/model/table-model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class TransactionsComponent implements OnInit {

  tableColumns = [
    { prop: 'initiatorName', name: 'Payer', searchType: 'text' },
    { prop: 'amount', name: 'Amount', pipe: "Currency", custom: true, searchType: 'number' },
    {
      prop: 'transactionType', name: 'Transaction', custom: true, searchType: 'dropdown', selectOptions: [
        { id: "Credit", name: 'Credit' },
        { id: "Debit", name: 'Debit' },
      ]
    },
    { prop: 'channel', name: 'Channel' },
    { prop: 'beneficiaryAccountNumber', name: 'Beneficiary Account', custom: true, searchType: 'number' },
    { prop: 'initiatorAccountNumber', name: 'Payer Account', custom: true, searchType: 'number' },
    { prop: 'createdAt', name: 'Time', pipe: "Date", searchType: 'Date' }
  ];

  service = inject(TransactionService)
  paymentService = inject(PaymentService)
  private store = inject(Store<AppStateInterface>)
  currentUser$: Observable<IProfile | null>;
  balance = signal<number>(0)
  tableConfig: ITableConfig = {
    showSummary: true,
    tableName: "Transactions Table",
    singleAction: true
    // actionable:false
  }


  ngOnInit(): void {

    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.fetchBalance()
  }

  fetchBalance() {
    this.paymentService.getBalance().subscribe(x => {

      this.balance.set(x)
    })
  }


  handleAllSelection(rows: any[]) {

  }

  protected readonly globalizeDate = globalizeDate();
}
