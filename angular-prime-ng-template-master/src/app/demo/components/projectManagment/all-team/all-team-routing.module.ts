import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTachesComponent } from '../all-taches/all-taches.component';
import { AllTeamComponent } from './all-team.component';

const routes: Routes = [
  { path: '', component: AllTeamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTeamRoutingModule { }
