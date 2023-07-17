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
    // {prop: 'id', name: 'Id'},
    {prop: 'initiatorName', name: 'Payer', searchType: 'text'},
    {prop: 'amount', name: 'Amount', pipe: "Currency", custom: true, searchType: 'number'},
    {prop: 'transactionType', name: 'Transaction', custom: true, searchType: 'dropdown'},
    {prop: 'initiatorAccountNumber', name: 'Payer Account', custom: true, searchType: 'number'},
    {prop: 'createdAt', name: 'Time', pipe: "Date", searchType: 'Date'}
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
