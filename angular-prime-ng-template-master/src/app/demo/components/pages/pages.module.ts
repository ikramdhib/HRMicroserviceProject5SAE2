import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { JobListComponent } from './job-list/job-list.component';


@NgModule({
    declarations: [
  
    ConfirmationComponent,
       JobListComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
