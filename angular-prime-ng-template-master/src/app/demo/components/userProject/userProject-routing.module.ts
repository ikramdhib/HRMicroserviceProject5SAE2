
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    { path: 'change-password', loadChildren: () => import('./change-pass/change-pass.module').then(m => m.ChangePassModule) },
    { path: 'employees', loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListModule) },
    { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule) },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class UserProjectModuleRoutes {

  }