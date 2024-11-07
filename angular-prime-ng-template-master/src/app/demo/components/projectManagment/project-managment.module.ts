import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projectManagmentRoutes } from './project-managment-routing.module';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { EditTeamComponent } from './edit-team/edit-team.component';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        projectManagmentRoutes,
    ],
})
export class projectManagment {

}
