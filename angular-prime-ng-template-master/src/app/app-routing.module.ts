import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import { ContenuCrudComponent } from './cours/components/contenu/contenu-crud.component';
import { CoursCrudComponent } from './cours/components/cours/cours-crud.component';
import { SectionCrudComponent } from './cours/components/section/section-crud.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'mydashboard', component: MydashboardComponent },
            // Nouvelle route pour le formulaire de contenu
            { path: 'contenus', component: ContenuCrudComponent },
            { path: 'cours', component: CoursCrudComponent },
            { path: 'sections', component: SectionCrudComponent },
        ],
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'pages/notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'pages/notfound' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
