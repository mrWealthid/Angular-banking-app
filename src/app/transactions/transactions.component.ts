import {Component, OnInit} from '@angular/core';
import {TransactionService} from "./transaction.service";
import {faClipboard} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class TransactionsComponent implements OnInit {

  // faCopy = faCopy;
  faClipboard = faClipboard;
  tableColumns = [
    {prop: 'id', name: 'Id'},
    {prop: 'depositorName', name: 'Payer'},
    {prop: 'amount', name: 'Amount', pipe: "Currency", custom: true},
    {prop: 'transactionType', name: 'Transaction', custom: true},
    {prop: 'depositorAccountNumber', name: 'Payer Account', custom: true},
    {prop: 'createdAt', name: 'Time', pipe: "Date"}
  ];

  protected readonly TransactionService = TransactionService;


  constructor(public service: TransactionService) {
  }

  ngOnInit(): void {


  }

  handleAllSelection(rows: []) {
    console.log("I bubbled up", rows)
  }
}
