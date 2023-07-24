import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-tree',
  templateUrl: './summary-tree.component.html',
  styleUrls: ['./summary-tree.component.css']
})
export class SummaryTreeComponent {

  @Input()
  data : any[]
}
