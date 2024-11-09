import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/config/auth.guard';
import { AuthorizationGuardsService } from 'src/app/config/authorization-guards.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'conge', loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] }},
        { path: 'conge-admin', loadChildren: () => import('./conge-admin/congeadmin.module').then(m => m.CongeadminModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['EMPLOYEE'] }},
        { path: 'departement', loadChildren: () => import('./Departement/departement.module').then(m => m.departementModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] } },
        { path: 'recruiting', loadChildren: () => import('./recruiting/recruiting.module').then(m => m.recruitingModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
