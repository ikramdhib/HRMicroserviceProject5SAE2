import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    DynamicDialogModule,
    ToastModule,
    ConfirmPopupModule,
    AutoCompleteModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CommonModule,
    ProfileRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
  ]
})
export class ProfileModule { }
