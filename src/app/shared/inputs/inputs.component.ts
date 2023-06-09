import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;

  control: any;
  hasError: boolean;
  errorMessage: any;

  constructor(@Optional() @Self() private ngControl: NgControl) {
  }

  get showError() {
    return this.control && this.control.touched && this.control.invalid;
  }

  ngOnInit() {
    if (this.ngControl) {
      this.control = this.ngControl.control;
      this.control?.statusChanges.subscribe(() => {
        this.hasError = this.showError;
        this.errorMessage = this.getErrorMessage();
      });
    }
  }

  writeValue(value: any): void {
    if (this.control) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    if (this.control) {
      this.control.valueChanges.subscribe(fn);
    }
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  getErrorMessage() {
    if (this.showError && this.control.errors) {
      for (const errorName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(errorName)) {
          return this.getErrorMessageForValidator(errorName);
        }
      }
    }
    return null;
  }

  getErrorMessageForValidator(validatorName: string) {
    switch (validatorName) {
      case 'required':
        return 'This field is required.';
      // Add additional cases for other validators
      default:
        return null;
    }
  }
}
