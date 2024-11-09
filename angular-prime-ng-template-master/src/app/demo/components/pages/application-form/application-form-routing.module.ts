import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './application-form.component';

@NgModule({
  imports: [RouterModule.forChild(
    
    [{path: '', component: ApplicationFormComponent}]
  )],
  exports: [RouterModule]
})
export class ApplicationFormRoutingModule { }
