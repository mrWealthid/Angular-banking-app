import {Component, OnInit} from '@angular/core';
import {DatabaseInterface} from "../shared/interface/database-interface";
import {WebStorageService} from "../shared/services/web-storage.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    data: DatabaseInterface;
    userName: string = "John Doe";
    accountNumber: number = 11111;
    dropDownList: number;

    constructor(private webStorage: WebStorageService) {
    }

    // checktransferType(amount: Number): string {
    //     if (amount > 0) {
    //         return "Credit";
    //     }
    //     return "Debit";
    // }

    ngOnInit(): void {
        this.data = this.webStorage.retrieveFromStorage("currentUser");
    }
}
