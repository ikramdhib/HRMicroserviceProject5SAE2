import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'addjoboffer', loadChildren: () => import('./add-job-offer/add-job-offer.module').then(m => m.AddJobOfferModule) },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitingManagementRoutingModule { }
