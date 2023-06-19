import {Component, Directive, Input} from '@angular/core';


@Directive({
  selector: 'header-row',
})

export class TableHeaderRowDirective {
}

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent {


  @Input() tableSettings: any
  // @ContentChild('headerActions') headerActions!: TemplateRef<any>;
}
