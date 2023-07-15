import {Component, Directive, EventEmitter, Input, Output} from '@angular/core';


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

  @Output() reload = new EventEmitter();

  // @ContentChild('headerActions') headerActions!: TemplateRef<any>;
  handleReload() {
    this.reload.emit()
  }
}
