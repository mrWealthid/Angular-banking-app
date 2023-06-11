// input.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";

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
  @Input() label: string;
  @Input() type: string;
  @Input() formControl: FormControl;

  isShown: boolean = false;
  protected readonly faLock = faLock;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;

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

  validatePassword() {
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
