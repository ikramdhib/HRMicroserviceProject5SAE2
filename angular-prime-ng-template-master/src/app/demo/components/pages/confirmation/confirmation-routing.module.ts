export class ConfirmationRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';

@NgModule({
  imports: [RouterModule.forChild(
    
    [{path: '', component: ConfirmationComponent}]
  )],
  exports: [RouterModule]
})
export class ApplicationFormRoutingModule { }
