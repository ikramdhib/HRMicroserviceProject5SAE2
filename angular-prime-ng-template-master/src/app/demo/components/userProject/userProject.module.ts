import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProjectModuleRoutes } from './userProject-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EmployeeListRoutingModule } from './employee-list/employee-list-routing.module';
import { HrComponent } from './hr/hr.component';
import { HrDialogComponent } from './hr-dialog/hr-dialog.component';


@NgModule({
    declarations: [
      EmployeeDialogComponent,
      HrDialogComponent
  ],
    imports: [

        CommonModule,
        UserProjectModuleRoutes,
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
    ],
})
export class UserProjectModule {

}
