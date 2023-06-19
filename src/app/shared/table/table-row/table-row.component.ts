import {Component, Directive} from '@angular/core';


@Directive({
  selector: 'table-row',
})

export class TableRowDirective {
}

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent {

}
