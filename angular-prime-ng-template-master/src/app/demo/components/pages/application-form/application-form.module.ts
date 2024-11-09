import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationFormRoutingModule } from './application-form-routing.module';
import { ApplicationFormComponent } from './application-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Make sure to import FormsModule and ReactiveFormsModule
import { InputNumberModule } from 'primeng/inputnumber'; // Import InputNumberModule

//import { RecruitingComponent } from './recruiting.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
//import { RecruitingRoutingModule } from './recruiting-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';  // Import ConfirmPopupModule
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { InputMaskModule } from "primeng/inputmask";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';

@NgModule({
  imports: [ 
    ReactiveFormsModule,
    InputTextareaModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    PickListModule,
    OrderListModule,
    CommonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ApplicationFormRoutingModule,
    AutoCompleteModule,
    ChipsModule,
    InputMaskModule,
    ColorPickerModule,
    CascadeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SliderModule,
    ChipModule,
    KnobModule,
    InputSwitchModule,
    ListboxModule,
    SelectButtonModule,
    CheckboxModule,
    ButtonModule
  ],
  declarations: [ApplicationFormComponent],
  providers: [ConfirmationService, MessageService],
})
export class ApplicationFormModule { }
