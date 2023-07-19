import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";


@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent {
  @Input() items: selectOptions[];
  @Input() label: string
  @Input() multiple: boolean;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() placeholder: string;
  @Input({required: true}) formControl: FormControl
  @Output()
  changeEvent = new EventEmitter()


  value: any;
  onChange: any = (val: any) => {

  };
  onTouched: any = () => {
  };

  hasRequiredValidator() {
    return this.formControl.hasValidator(Validators.required)
  }

  writeValue(value: any): void {
    this.value = this.formControl.value === "" ? null : this.formControl.value;
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  handleChange($event: any) {
    this.changeEvent.emit($event)
  }
}

export type selectOptions = {
  name?: string,
  id?: number | string
}
