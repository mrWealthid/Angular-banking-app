import {Component, forwardRef, Input} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";


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
  @Input() items: any[];
  @Input() label: string
  @Input() multiple: boolean;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() placeholder: string;
  @Input() formControl: FormControl

  value: any;
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  
}
