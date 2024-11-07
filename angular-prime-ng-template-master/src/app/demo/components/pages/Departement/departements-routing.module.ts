import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartementComponent } from './departement.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DepartementComponent }
    ])],
    exports: [RouterModule]
})
export class DepartementRoutingModule { }
