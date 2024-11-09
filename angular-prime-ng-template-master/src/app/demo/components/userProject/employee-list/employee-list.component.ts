import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class EmployeeListComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  customers1: any[] = [];

 


  selectedCustomers1: any[] = [];


  representatives: any[] = [];

  statuses: any[] = [];

  products: any[] = [];

  rowGroupMetadata: any;


  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private dialogService: DialogService,private confirmationService: ConfirmationService,private messageService: MessageService,private userServ : UserService ) { }

  ngOnInit() {

    this.getAlluser();

  }

  getAlluser(){
    return this.userServ.getUsersRole("EMPLOYEE").subscribe({
      next:(res)=>{
        this.customers1 =res;
        console.log(res)
        this.loading = false;
      }
    })
  }
  addEmployee() {
    this.ref = this.dialogService.open(EmployeeDialogComponent, {
      header: 'Ajouter un noveau employe',
      width: '500px',
      contentStyle: { 'max-height': '500px', 'overflow': 'hidden' }, // Pour le défilement
      baseZIndex: 10000 
    });

  this.ref.onClose.subscribe((newEmployee) => {
    if (newEmployee) {
      this.getAlluser(); // Recharger les données si un nouvel employé est ajouté
    }
  });
  }
  formatCurrency(value: number) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  confirm1(id:any) {
    this.confirmationService.confirm({
        key: 'confirm1',
        message: 'Are you sure to perform this action?',
        accept: () => {
           this.deletUser(id)
        },
    });
}

deletUser(id:any){
  this.userServ.deleteUser(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'Supprimer avec succes' });
      this.getAlluser(); // Recharger les données
    },
    error:(err)=>{
      this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

    }
  })
}

editEmployee(employee: any) {
  this.ref = this.dialogService.open(EmployeeDialogComponent, {
    header: 'Modifier Employé',
    width: '500px',
    contentStyle: { 'max-height': '500px', 'overflow': 'hidden' },
    baseZIndex: 10000,
    data: { employee }, // Passer les données au composant
  });

  this.ref.onClose.subscribe((updatedEmployee) => {
    if (updatedEmployee) {
      this.getAlluser(); // Recharger les données après la modification
    }
  });
}

}
