import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IDatePickerConfig} from "ng2-date-picker";
import * as dayjs from "dayjs";
import {FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements OnInit {
  // @ViewChild(DatePickerDirective, {static: false}) datepicker: DatePickerDirective;
  // @ViewChild('datePickerComponent', {static: false}) datepicker: DatePickerComponent;


  date = dayjs();

  @Input({required: true}) formControl: FormControl;
  @Input({required: true}) label: string;
  @Input() dateConfig: IDatePickerConfig;

  config: IDatePickerConfig = {
    format: 'DD-MM-YYYY',


  };

  ngOnInit() {
    this.config = {...this.config, ...this.dateConfig}
    this.setDefaults()
  }


  setDefaults() {
    if (!this.config.min) this.config.min = dayjs().subtract(100, 'year')

    if (!this.config.max) this.config.max = dayjs()
  }


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


  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }


}


