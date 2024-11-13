import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from 'src/app/demo/service/demo/components/pages/confirmation/confirmation.component';

const routes: Routes = [
  {path: '', component: ConfirmationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationRoutingModule { }
