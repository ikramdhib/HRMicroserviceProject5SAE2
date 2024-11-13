import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonceComponent } from './anonce.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AnonceComponent }
])],
exports: [RouterModule]
})
export class AnonceRoutingModule { }