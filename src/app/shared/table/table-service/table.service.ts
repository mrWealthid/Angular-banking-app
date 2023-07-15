import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  @Input()
  tableService: any

  constructor() {


  }
}
