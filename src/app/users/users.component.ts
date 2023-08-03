import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "./service/user.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
 
  userService = inject(UserService)
   

  columns = [
    {prop: 'name', name: 'Name', searchType: 'text'},
    {prop: 'email', name: 'Email', searchType: 'number'},
    {prop: 'role', name: 'Role', custom: true, searchType: 'dropdown'},
    {prop: 'accountNumber', name: 'Account Number', custom: true, searchType: 'number'},
    {prop: 'dateOfBirth', name: 'DOB', pipe: "Date", searchType: 'Date'}
  ]


}
