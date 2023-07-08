import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from "./button/button.component";
import {TableComponent} from "./table/table.component";
import {ImageUploadComponent} from "../image-upload/image-upload.component";
import {StepperComponent} from "./stepper/stepper.component";
import {InputsComponent} from "./inputs/inputs.component";
import {PasswordInputComponent} from "./inputs/password-input/password-input.component";
import {EmailInputComponent} from "./inputs/email-input/email-input.component";
import {TextInputComponent} from "./inputs/text-input/text-input.component";
import {SelectInputComponent} from "./inputs/select-input/select-input.component";
import {ProjectionsComponent, ProjectionsDirective} from "../projections/projections.component";
import {TableHeaderComponent, TableHeaderRowDirective} from "./table/table-header/table-header.component";
import {TableRowComponent, TableRowDirective} from "./table/table-row/table-row.component";
import {ClipboardComponent} from "./clipboard/clipboard.component";
import {DropdownComponent} from "./dropdown/dropdown.component";
import {ClickOutsideDirective} from "./directives/ClickOutside";
import {AccountLookupComponent} from "./account-lookup/account-lookup.component";
import {LabelComponent} from "./inputs/label/label.component";
import {ChartsComponent} from "./charts/charts.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgSelectModule} from "@ng-select/ng-select";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgApexchartsModule} from "ng-apexcharts";
import {ModalComponent} from "./modal/modal.component";
import {ModalsComponent} from "./modals/modals.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToastrModule} from "ngx-toastr";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DpDatePickerModule} from "ng2-date-picker";


@NgModule({
  declarations: [
    ButtonComponent,
    TableComponent,
    ImageUploadComponent,
    StepperComponent,
    InputsComponent,
    PasswordInputComponent,
    EmailInputComponent,
    TextInputComponent,
    ModalComponent,
    ModalsComponent,
    SelectInputComponent,
    ProjectionsDirective,
    TableHeaderRowDirective,
    TableRowDirective,
    ClipboardComponent,

    DropdownComponent, ClickOutsideDirective, ProjectionsComponent, TableHeaderComponent, TableRowComponent, ClipboardComponent, AccountLookupComponent, LabelComponent, ChartsComponent, DatePickerComponent],
  imports: [
    DpDatePickerModule,
    MatDatepickerModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    NgOptimizedImage, NgApexchartsModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rotatingPlane,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#111827FF",
      secondaryColour: "red",
      tertiaryColour: "blue",
    }),
  ],
  exports: [
    ButtonComponent,
    TableComponent,
    ImageUploadComponent,
    StepperComponent,
    InputsComponent,
    PasswordInputComponent,
    EmailInputComponent,
    TextInputComponent,
    ModalComponent,
    ModalsComponent,
    SelectInputComponent,
    ProjectionsDirective,
    TableHeaderRowDirective,
    TableRowDirective,
    ClipboardComponent,
    DropdownComponent, ClickOutsideDirective, ProjectionsComponent, TableHeaderComponent, TableRowComponent, ClipboardComponent, AccountLookupComponent, LabelComponent, ChartsComponent, DatePickerComponent]
})
export class SharedModule {
}
