import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'conge', loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule)},
        { path: 'conge-admin', loadChildren: () => import('./conge-admin/congeadmin.module').then(m => m.CongeadminModule)},
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'departement', loadChildren: () => import('./Departement/departement.module').then(m => m.departementModule) }

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
