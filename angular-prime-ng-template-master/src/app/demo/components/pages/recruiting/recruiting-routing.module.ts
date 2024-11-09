import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecruitingComponent } from './recruiting.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecruitingComponent }
    ])],
    exports: [RouterModule]
})
export class RecruitingRoutingModule { }

