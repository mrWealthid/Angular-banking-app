import {Component, inject} from '@angular/core';
import {LoansService} from "./service/loans.service";
import { ITableConfig } from '../shared/table/model/table-model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  loanService = inject(LoansService)

  tableConfig: ITableConfig = {
    showSummary: true,
    tableName: "Transactions Table",
    singleAction:true,
    searchParams: {status: "PENDING"},
   statusData: [{name:'Pending', value:'PENDING'}, {name:'Approved', value: 'APPROVED'}, {name:'Declined', value:'DECLINED'}]
    // actionable:false
  }

  columns = [
    {prop: 'name', name: 'Name', searchType: 'text'},
    // {prop: 'email', name: 'Email', searchType: 'number'},
    {prop: 'amount', name: 'Amount', searchType: 'number', pipe: "Currency"},
    {prop: 'status', name: 'Status', searchType: 'dropdown', custom: true},
    {prop: 'paymentStatus', name: 'Payment Status', custom: true, searchType: 'dropdown'},
    {prop: 'actionedBy', name: 'Actioned By',  searchType: 'text'},
    // {prop: 'dueDate', name: 'Due Date', searchType: 'Date'},
    // {prop: 'rate', name: 'Rate', searchType: 'text'},
    {prop: 'accountNumber', name: 'Account NO', custom: true, searchType: 'number'},
    {prop: 'requestDate', name: 'Time', pipe: "Date", searchType: 'Date'}
  ]
}
