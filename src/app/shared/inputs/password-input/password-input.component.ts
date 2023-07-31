// input.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input({required: true}) label: string;
  @Input() type: string;
  @Input({required: true}) formControl: FormControl;
  @Input() placeholder: string = 'password'

  isShown: boolean = false;
  protected readonly faLock = faLock;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;

  onChange: (value: any) => void = () => {
  };


  hasRequiredValidator() {
    return this.formControl.hasValidator(Validators.required)
  }

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

  validatePassword() {
    return !this.formControl.pristine   && /INVALID/i.test(this.formControl.status);
  }

  
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
