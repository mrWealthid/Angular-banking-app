import {Component, inject} from '@angular/core';
import {LoansService} from "./service/loans.service";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  loanService = inject(LoansService)

  columns = [
    {prop: 'name', name: 'Name', searchType: 'text'},
    // {prop: 'email', name: 'Email', searchType: 'number'},
    {prop: 'amount', name: 'Amount', searchType: 'number', pipe: "Currency"},
    {prop: 'status', name: 'Status', searchType: 'dropdown', custom: true},
    {prop: 'paymentStatus', name: 'Payment Status', custom: true, searchType: 'dropdown'},
    // {prop: 'dueDate', name: 'Due Date', searchType: 'Date'},
    // {prop: 'rate', name: 'Rate', searchType: 'text'},
    {prop: 'accountNumber', name: 'Account NO', custom: true, searchType: 'number'},
    {prop: 'requestDate', name: 'Time', pipe: "Date", searchType: 'Date'}
  ]
}
