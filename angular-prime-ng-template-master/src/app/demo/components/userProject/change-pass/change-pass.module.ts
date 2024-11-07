import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ChangePassComponent],
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    DynamicDialogModule,
    CommonModule,
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
export class ChangePassModule { }
