import {Component, OnInit} from '@angular/core';
import {DatabaseInterface} from "../shared/interface/database-interface";
import {WebStorageService} from "../shared/services/web-storage.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links = [
    {path: '/dashboard', text: 'Overview'},
    {path: 'profile', text: 'User'},
    {path: 'transactions', text: 'Transactions'}
  ]
    constructor() {
    }



    ngOnInit(): void {

    }
}
