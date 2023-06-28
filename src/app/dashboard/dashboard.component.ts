import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links = [
    {icon: "", path: '/dashboard', text: 'Overview'},
    {icon: "", path: 'profile', text: 'Profile'},
    {icon: "", path: 'transactions', text: 'Transactions'},
    {icon: "", path: 'payments', text: 'Payments'}
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
