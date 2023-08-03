import {Component, Directive, EventEmitter, Input, Output} from '@angular/core';
import {ITableConfig} from "../model/table-model";


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


  @Input() tableSettings: ITableConfig

  @Output() reload = new EventEmitter();

  @Output() handleStatus = new EventEmitter()

  // @ContentChild('headerActions') headerActions!: TemplateRef<any>;
  handleReload() {
    this.reload.emit()
  }

  handleStatusFetch() {
    this.handleStatus.emit()
  }
}
