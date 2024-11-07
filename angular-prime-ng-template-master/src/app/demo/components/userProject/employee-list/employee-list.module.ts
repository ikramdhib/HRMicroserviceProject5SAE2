import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { EmployeeListComponent } from './employee-list.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [EmployeeListComponent ],
  imports: [
    
    CommonModule,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    DynamicDialogModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    DialogModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    TooltipModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    EmployeeListRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeListModule { }
