import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitingManagementRoutingModule } from './recruiting-management-routing.module';
import { AddJobOfferComponent } from './add-job-offer/add-job-offer.component';


@NgModule({
  declarations: [
    AddJobOfferComponent
  ],
  imports: [
    CommonModule,
    RecruitingManagementRoutingModule
  ]
})
export class RecruitingManagementModule { }
