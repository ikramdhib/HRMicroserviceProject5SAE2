import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ContenuCrudComponent } from './cours/components/contenu/contenu-crud.component';
import { CoursCrudComponent } from './cours/components/cours/cours-crud.component';
import { SectionCrudComponent } from './cours/components/section/section-crud.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './config/auth.guard';
import { AuthorizationGuardsService } from './config/authorization-guards.service';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule) },
            {
                
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  } ,
                    { path: 'projet', loadChildren: () => import('./demo/components/projectManagment/project-managment.module').then(m=>m.projectManagment) , canActivate: [AuthGuard  ] },
                    { path: 'user', loadChildren: () => import('./demo/components/userProject/userProject.module').then(m=>m.UserProjectModule) , canActivate: [AuthGuard]  },
                    { path: 'contenus', component: ContenuCrudComponent ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] }},
                    { path: 'cours', component: CoursCrudComponent,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN','EMPLOYEE'] } },
                    { path: 'sections', component: SectionCrudComponent,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] } },
                   
                    { path: 'recruite', loadChildren: () => import('./demo/components/recruiting-management/recruiting-management.module').then(m => m.RecruitingManagementModule) },
                    // New Update Template
                    
                ],
            },

           { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })

   
],
    exports: [RouterModule]
})
export class AppRoutingModule { }
