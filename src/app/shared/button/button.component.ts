import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {


  @Input({required: true})
  btnText: string

  @Input()
  styles: string


  @Input()
  disabled: boolean

  @Input()
  loading: Boolean = false

  @Input()
  type: string = 'submit'

  @Output() clickEvent = new EventEmitter();

  constructor() {
  }

  emitEvent() {
    this.clickEvent.emit()
  }

  ngOnInit(): void {
  }

}
