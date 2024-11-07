import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-team-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddTeamComponent } from './add-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditTeamComponent } from '../edit-team/edit-team.component';

@NgModule({
  declarations: [AddTeamComponent , EditTeamComponent],
  imports: [
    DynamicDialogModule,
    CommonModule,
    AddTeamRoutingModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AddTeamModule { }
