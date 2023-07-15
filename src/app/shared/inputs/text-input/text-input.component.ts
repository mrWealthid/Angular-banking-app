import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input({required: true}) label: string;
  @Input() type: string = 'text';
  @Input() placeholder: string;
  @Input({required: true}) formControl: FormControl;


  protected readonly faUser = faUser;
  protected readonly Validators = Validators;

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
