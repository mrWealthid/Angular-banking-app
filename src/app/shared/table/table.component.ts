import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  @Input() rows: any[];
  @Input() columns: any[];
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() totalRecords: number;
  constructor() { }

  ngOnInit(): void {
console.log('test')
  }

  onPageChange($event: any) {

  }
}
