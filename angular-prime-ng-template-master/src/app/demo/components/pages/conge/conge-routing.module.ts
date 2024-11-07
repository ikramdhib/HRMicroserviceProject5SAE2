import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongeComponent } from './conge.component';

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CongeComponent }
	])],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
