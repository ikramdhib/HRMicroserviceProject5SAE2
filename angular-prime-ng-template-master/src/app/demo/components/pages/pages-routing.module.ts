import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/config/auth.guard';
import { AuthorizationGuardsService } from 'src/app/config/authorization-guards.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'conge', loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] }},
        { path: 'conge-admin', loadChildren: () => import('./conge-admin/congeadmin.module').then(m => m.CongeadminModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
        { path: 'departement', loadChildren: () => import('./Departement/departement.module').then(m => m.departementModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] } },
        { path: 'recruiting', loadChildren: () => import('./recruiting/recruiting.module').then(m => m.recruitingModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
        { path: 'application-form/:jobId', loadChildren: () => import('./application-form/application-form.module').then(m => m.ApplicationFormModule) },
        { path: 'Annonces', loadChildren: () => import('./anonce/anonce.module').then(m => m.AnonceModule) },
        { path: 'confirmation', loadChildren: () => import('./confirmation/confirmation.module').then(m => m.ConfirmationModule) },
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
