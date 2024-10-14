import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTachesComponent } from './all-taches.component';

const routes: Routes = [
  { path: '', component: AllTachesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTachesRoutingModule { }
