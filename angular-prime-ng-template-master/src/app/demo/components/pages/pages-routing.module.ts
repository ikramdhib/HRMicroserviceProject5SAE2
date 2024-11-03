import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'recruiting', loadChildren: () => import('./recruiting/recruiting.module').then(m => m.recruitingModule) },
        { path: 'ApplicationForm', loadChildren: () => import('./application-form/application-form.module').then(m => m.ApplicationFormModule) },])],
        

    exports: [RouterModule]
})
export class PagesRoutingModule { }
