import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobOfferComponent } from './add-job-offer.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AddJobOfferComponent }

  ])],
  exports: [RouterModule]
})
export class AddJobOfferRoutingModule { }


