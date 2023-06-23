// input.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'acc-lookup',
  templateUrl: './account-lookup.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountLookupComponent),
      multi: true,
    },
  ],
  styleUrls: ['./account-lookup.component.css']
})
export class AccountLookupComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() formControl: FormControl;
  @Input() data: any;


  protected readonly faUser = faUser;


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


  validateControl() {
    return !this.formControl.pristine && this.formControl.errors?.hasOwnProperty('required');
  }

  validateAccount() {
    return !this.formControl.pristine && this.formControl.errors?.hasOwnProperty('InvalidAccountNumber');
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
