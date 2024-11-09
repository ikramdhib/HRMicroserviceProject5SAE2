
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/config/auth.guard";
import { AuthorizationGuardsService } from "src/app/config/authorization-guards.service";

const routes: Routes = [
  
  { path: 'addteam', loadChildren: () => import('./add-team/add-team.module').then(m => m.AddTeamModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] } },
  { path: 'addprojet', loadChildren: () => import('./add-projet/add-projet.module').then(m => m.AddProjetModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
  { path: 'addtaches', loadChildren: () => import('./add-taches/add-taches.module').then(m => m.AddTachesModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
  { path: 'projets', loadChildren: () => import('./all-projets/all-projets.module').then(m => m.AllProjetsModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
  { path: 'teams', loadChildren: () => import('./all-team/all-team.module').then(m => m.AllTeamModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
  { path: 'taches/:id', loadChildren: () => import('./all-taches/all-taches.module').then(m => m.AllTachesModule) ,canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['HR','ADMIN'] }},
  { path: 'todoList/:id', loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['EMPLOYEE'] } },
  { path: 'userprojet', loadChildren: () => import('./user-project/user-project.module').then(m => m.UserProjectModule),canActivate: [AuthGuard, AuthorizationGuardsService] ,data: { roles: ['EMPLOYEE'] } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class projectManagmentRoutes {

  }