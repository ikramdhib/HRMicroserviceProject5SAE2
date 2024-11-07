import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './config/auth.guard';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule) },
            {
                
                path: '', component: AppLayoutComponent,
                children: [
                 
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]  },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule), canActivate: [AuthGuard]  },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule), canActivate: [AuthGuard]  },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule), canActivate: [AuthGuard]  },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule), canActivate: [AuthGuard]  },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  },
                    { path: 'projet', loadChildren: () => import('./demo/components/projectManagment/project-managment.module').then(m=>m.projectManagment) , canActivate: [AuthGuard]  },
                    { path: 'user', loadChildren: () => import('./demo/components/userProject/userProject.module').then(m=>m.UserProjectModule) , canActivate: [AuthGuard]  },

                    // New Update Template
                    { path: 'mydashboard', component: MydashboardComponent },
                ],
            },

           // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
          
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
