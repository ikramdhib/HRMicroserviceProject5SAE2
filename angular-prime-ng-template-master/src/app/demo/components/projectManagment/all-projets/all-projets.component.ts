import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { ProjetService } from '../Services/projet.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddProjetComponent } from '../add-projet/add-projet.component'; 
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projets',
  templateUrl: './all-projets.component.html',
  providers: [MessageService, ConfirmationService,DialogService],
  styleUrls: ['./all-projets.component.scss']
})
export class AllProjetsComponent  {
  ref: DynamicDialogRef | undefined;

  customers1: Customer[] = [];


 

  selectedCustomers1: Customer[] = [];

  selectedCustomer: Customer = {};

  representatives: Representative[] = [];



  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private router: Router,private dialogService: DialogService,private confirmationService: ConfirmationService,private messageService: MessageService,private projetService : ProjetService) { }

  openDialog(projet: any) {
    this.ref = this.dialogService.open(AddProjetComponent, {
      header: 'Modifier Projet',
      width: '50%',
      data: {
        projet: projet // Passer le projet sélectionné ici
      }
    });
  }

  ngOnInit() {

    this.getAllproject();

  }

  confirm1(id:any) {
    this.confirmationService.confirm({
        key: 'confirm1',
        message: 'Are you sure to perform this action?',
        accept: () => {
           this.deletProjet(id)
        },
    });
}

  

  getAllproject(){
    return this.projetService.getAllProject().subscribe({
      next:(res)=>{
        this.customers1 =res;
        this.loading = false;
      }
    })
  }
 
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  deletProjet(id:any){
    this.projetService.deletePrpjet(id).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le projet est suprimé avec succés' });
        
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

      }
    })
  }

  naviguerAvecId(id: any): void {
    this.router.navigate(['projet/taches', id]); // Naviguer vers '/mon-chemin/{id}'
  }
}
