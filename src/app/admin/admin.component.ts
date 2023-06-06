import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../shared/services/database.service";
import {DatabaseInterface} from "../shared/interface/database-interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dropDownList: number;
  users: DatabaseInterface[];

  constructor(public db: DatabaseService) {
  }

  ngOnInit(): void {
  }
}