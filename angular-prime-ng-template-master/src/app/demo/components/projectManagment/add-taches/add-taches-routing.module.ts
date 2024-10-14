import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTachesComponent } from './add-taches.component';

const routes: Routes = [
  { path: '', component: AddTachesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTachesRoutingModule { }
