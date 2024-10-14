import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProjectComponent } from './user-project.component';

const routes: Routes = [
  { path: '', component: UserProjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProjectRoutingModule { }
