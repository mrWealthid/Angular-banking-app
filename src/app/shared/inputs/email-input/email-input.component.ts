// input.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {faAt, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'email-input',
  templateUrl: './email-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true,
    },
  ],
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements ControlValueAccessor {
  @Input({required: true}) label: string;
  @Input() type: string;
  @Input({required: true}) formControl: FormControl;
  @Input() placeholder: string = 'Enter Email'

  isShown: boolean = false;
  faAt = faAt;
  faCircleExclamation = faCircleExclamation;

  hasRequiredValidator() {
    return this.formControl.hasValidator(Validators.required)
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: any): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  togglePassword() {
    this.isShown = !this.isShown;
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
