// input.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-input',
  templateUrl: './inputs.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true,
    },
  ],
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements ControlValueAccessor {
  @Input({required: true}) label: string;
  @Input() type: string;
  @Input({required: true}) formControl: FormControl;
  @Input() placeholder: string;
  @Input() icon: string = 'fa-solid fa-user'

  protected readonly faUser = faUser;
  protected readonly Validators = Validators;

  constructor() {
  }

  onChange: (value: any) => void = () => {

  };

  onTouched: () => void = () => {
  };

  writeValue(value: any): void {

    this.onChange(value);
  }

  hasRequiredValidator() {
    return this.formControl.hasValidator(Validators.required)
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validateControl() {
    return !this.formControl.pristine && /INVALID/i.test(this.formControl.status);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
