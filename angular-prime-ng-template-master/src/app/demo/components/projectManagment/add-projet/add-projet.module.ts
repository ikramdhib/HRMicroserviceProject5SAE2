import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProjetRoutingModule } from './add-projet-routing.module';
import { AddProjetComponent } from './add-projet.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';
@NgModule({
  declarations: [AddProjetComponent ,EditProjectDialogComponent],
  imports: [
    DialogModule,
    DynamicDialogModule,
    CommonModule,
    AddProjetRoutingModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    AutoCompleteModule,
    CalendarModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    ToastModule
  ]
})
export class AddProjetModule { }
