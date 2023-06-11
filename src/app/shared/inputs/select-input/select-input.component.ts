import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent {
  @Input() items: any[];
  @Input() multiple: boolean;
  @Input() bindLabel: string;
  @Input() label: string;
  @Input() bindValue: string;
  @Input() placeholder: string;
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedItems: any[];

  onSelectionChange(): void {
    this.selectionChange.emit(this.selectedItems);
  }
}
