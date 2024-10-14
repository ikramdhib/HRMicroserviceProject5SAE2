import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTachesRoutingModule } from './add-taches-routing.module';
import { AddTachesComponent } from './add-taches.component';

import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';


import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [AddTachesComponent],
  imports: [
    ListboxModule,
    CardModule,
    TagModule,
    CommonModule,
    TooltipModule,
    AddTachesRoutingModule,
    RippleModule,
    MenuModule,
        MegaMenuModule,
        PanelMenuModule,
        MenubarModule,
        BreadcrumbModule,
        InputTextModule,
        TieredMenuModule,
        TabMenuModule,
        ContextMenuModule,
        StepsModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        ReactiveFormsModule,
        ToastModule
  ]
  
})
export class AddTachesModule { }
