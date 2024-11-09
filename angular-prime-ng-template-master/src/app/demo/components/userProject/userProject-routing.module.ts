
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "src/app/config/auth.guard";
import { AuthorizationGuardsService } from "src/app/config/authorization-guards.service";

const routes: Routes = [
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] } },
    { path: 'change-password', loadChildren: () => import('./change-pass/change-pass.module').then(m => m.ChangePassModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] } },
    { path: 'employees', loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] } },
    { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['ADMIN'] }},
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] }},
   

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class UserProjectModuleRoutes {

  }