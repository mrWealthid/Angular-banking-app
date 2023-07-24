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
import {TableHeaderComponent, TableHeaderRowDirective} from "./table/table-header/table-header.component";
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
import {DatePickerComponents} from './date-picker/date-pickers.component';
import {DpDatePickerModule} from "ng2-date-picker";
import {TabsComponent} from './tabs/tabs.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatModalComponent} from './mat-modal/mat-modal.component';
import {SummaryCardsComponent} from './summary-cards/summary-cards.component';
import {MaskDirective} from "./directives/Mask-directive";
import { SummaryTreeComponent } from './summary-tree/summary-tree.component';


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

    TableHeaderRowDirective,
    ClipboardComponent,
    MaskDirective,

    DropdownComponent, ClickOutsideDirective, TableHeaderComponent, ClipboardComponent, AccountLookupComponent, LabelComponent, ChartsComponent, DatePickerComponents, TabsComponent, MatModalComponent, SummaryCardsComponent, SummaryTreeComponent],
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
    MatDialogModule,
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
    MaskDirective,
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
    TableHeaderRowDirective,
    ClipboardComponent,
    DropdownComponent, ClickOutsideDirective, TableHeaderComponent, ClipboardComponent, AccountLookupComponent, LabelComponent, ChartsComponent, DatePickerComponents, TabsComponent, SummaryCardsComponent, SummaryTreeComponent]
})
export class SharedModule {
}
