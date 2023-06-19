import {Component, OnInit} from '@angular/core';
import {TransactionService} from "./transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],


  // providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class TransactionsComponent implements OnInit {


  testData = [
    {id: 1, name: 'John Doe', age: 25, city: 'New York'},
    {id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles'},
    {id: 3, name: 'Michael Johnson', age: 40, city: 'Chicago'},
    {id: 4, name: 'Emily Davis', age: 28, city: 'San Francisco'},
    {id: 5, name: 'Robert Wilson', age: 35, city: 'Houston'},
    {id: 6, name: 'Sophia Brown', age: 30, city: 'Seattle'},
    {id: 7, name: 'William Lee', age: 45, city: 'Miami'},
    {id: 8, name: 'Olivia Harris', age: 27, city: 'Boston'},
    {id: 9, name: 'Daniel Clark', age: 38, city: 'Dallas'},
    {id: 10, name: 'Mia Lewis', age: 33, city: 'Denver'}
  ];
  tableColumns = [
    {prop: 'id', name: 'Id'},
    {prop: 'depositorName', name: 'Payer'},
    {prop: 'amount', name: 'Amount'},
    {prop: 'transactionType', name: 'Transaction'},
    {prop: 'depositorAccountNumber', name: 'Payer Account'},
    {prop: 'createdAt', name: 'Time'}
  ];
  currentPage = 0;
  itemsPerPage = 5;
  totalItems = this.testData.length;
  protected readonly TransactionService = TransactionService;

  constructor(public service: TransactionService) {
  }

  ngOnInit(): void {


  }

  handleAllSelection(rows: []) {
    console.log("I bubbled up", rows)
  }
}
