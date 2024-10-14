
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  
  { path: 'addteam', loadChildren: () => import('./add-team/add-team.module').then(m => m.AddTeamModule) },
  { path: 'addprojet', loadChildren: () => import('./add-projet/add-projet.module').then(m => m.AddProjetModule) },
  { path: 'addtaches', loadChildren: () => import('./add-taches/add-taches.module').then(m => m.AddTachesModule) },
  { path: 'projets', loadChildren: () => import('./all-projets/all-projets.module').then(m => m.AllProjetsModule) },
  { path: 'teams', loadChildren: () => import('./all-team/all-team.module').then(m => m.AllTeamModule) },
  { path: 'taches/:id', loadChildren: () => import('./all-taches/all-taches.module').then(m => m.AllTachesModule) },
  { path: 'todoList', loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule) },
  { path: 'userprojet', loadChildren: () => import('./user-project/user-project.module').then(m => m.UserProjectModule) },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class projectManagmentRoutes {

  }