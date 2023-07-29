import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {DatePickerComponent, IDatePickerConfig,} from "ng2-date-picker";
import * as dayjs from "dayjs";
import {FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-pickers.component.html',
  styleUrls: ['./date-pickers.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponents),
      multi: true,

    },
  ],
  
})
export class DatePickerComponents implements OnInit {
  @ViewChild(DatePickerComponent) datepicker: DatePickerComponent;


  date = dayjs();

  @Input({required: true}) formControl: FormControl;
  @Input({required: true}) label: string;
  @Input() dateConfig: IDatePickerConfig;

  config: IDatePickerConfig = {
    format: 'YYYY-MM-DD',


  };

  

  ngOnInit() {
    this.config = {...this.config, ...this.dateConfig}
    this.setDefaults()


  }

  // ngAfterViewInit() {
  //   console.log(this.datepicker.api.open)
  // }


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


  openCalendar() {

    if (this.formControl.disabled) return
    this.datepicker.api.open()
  }
}


