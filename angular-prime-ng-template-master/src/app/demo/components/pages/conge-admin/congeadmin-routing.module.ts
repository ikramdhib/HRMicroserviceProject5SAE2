import { NgModule } from '@angular/core';
import { CongeAdminComponent } from './conge-admin.component';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CongeAdminComponent }
	])],
  exports: [RouterModule]
})
export class CongeadminRoutingModule { }
