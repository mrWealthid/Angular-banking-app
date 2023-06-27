import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links = [
    {path: '/dashboard', text: 'Overview'},
    {path: 'profile', text: 'Profile'},
    {path: 'transactions', text: 'Transactions'}, {path: 'payments', text: 'Payments'}
  ]
  isOpen: Boolean = false;

  constructor() {
  }


  ngOnInit(): void {

  }

  handleToggle() {

    this.isOpen = !this.isOpen

  }

  clickedOutside() {
    this.isOpen = false
  }
}
