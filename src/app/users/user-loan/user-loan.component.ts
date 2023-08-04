import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoansService } from 'src/app/loans/service/loans.service';
import { ITableConfig } from 'src/app/shared/table/model/table-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-loan',
  templateUrl: './user-loan.component.html',
  styleUrls: ['./user-loan.component.css']
})
export class UserLoanComponent {

  userService = inject(UserService)
  userId: any

  tableConfig:ITableConfig
 
  route = inject( ActivatedRoute)

  constructor(){
    this.userId =  this.route.snapshot.params['id']
    this.tableConfig = {
      showSummary: true,
      tableName: "Loans Table",
      singleAction:true,
      searchParams: {status: "PENDING", loanId: this.userId},
    //  statusData: [{name:'Pending', value:'PENDING'}, {name:'Approved', value: 'APPROVED'}, {name:'Declined', value:'DECLINED'}]
      // actionable:false
    }
   
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
