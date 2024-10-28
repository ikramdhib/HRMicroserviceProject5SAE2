import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../service/department.service';  // Adjust this path
import { Department } from './Department';  // Adjust this path
import { ConfirmationService, MessageService } from 'primeng/api';  // For confirmation and messages
import { ConfirmPopup } from 'primeng/confirmpopup'; // Import ConfirmPopup
import { Table } from 'primeng/table';


@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss'],
  providers: [MessageService]

})
export class DepartementComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  departmentDialog: boolean = false;
  department: Department = { id: 0, nom: '', description: '', type: '', status: '', location: '', budget: 0, manager: '', numberOfEmployees: 0 };
  globalFilter: string = '';
  editMode: boolean = false;
  confirmDialog: boolean = false; // For confirmation dialog
  departmentToDeleteId: number | null = null; // Store ID of department to delete
  submitted: boolean = false;
  departmentTypes = [
    { label: 'Human Resources', value: 'RESSOURCES_HUMAINES' },
    { label: 'IT', value: 'INFORMATIQUE' },
    { label: 'Marketing', value: 'MARKETING' },
    { label: 'Finance', value: 'FINANCE' },
    { label: 'Logistics', value: 'LOGISTIQUE' }
  ];

  statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Closed', value: 'CLOSED' }
  ];

  constructor(
    private departmentService: DepartmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirmPopup!: ConfirmPopup; 

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (err) => this.showError(err)
    });
  }

  openNew() {
    this.department = { id: 0, nom: '', description: '', type: '', status: '', location: '', budget: 0, manager: '', numberOfEmployees: 0 };
    this.submitted = false;
    this.departmentDialog = true;
    this.editMode = false;
  }

  editDepartment(department: Department) {
    this.department = { ...department };
    this.departmentDialog = true;
    this.editMode = true;
  }

  deleteSelectedDepartment() {
    if (!this.selectedDepartments || this.selectedDepartments.length === 0) {
      return; // Exit if no department is selected
    }

    // Show confirmation dialog
    this.confirmDialog = true; 
  }

  confirmDelete() {
    // Loop through selected departments and delete each one
    this.selectedDepartments.forEach(department => {
      const departmentId = department.id; // Get the ID of the selected department

      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: () => {
          // Remove the deleted department from the displayed list
          this.departments = this.departments.filter(d => d.id !== departmentId);
          this.selectedDepartments = []; // Clear selection after deletion
          this.showMessage('Department deleted successfully');
        },
        error: (err) => this.showError(err) // Handle error appropriately
      });
    });

    this.confirmDialog = false; // Close the dialog
  }



  saveDepartment() {
    this.submitted = true;
    if (this.department.nom.trim()) {
      if (this.editMode) {
        this.departmentService.updateDepartment(this.department.id, this.department).subscribe({
          next: (updated) => {
            this.departments[this.findIndexById(updated.id)] = updated;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'departement updated', life: 3000 });
            this.departmentDialog = false;
          },
          error: (err) => this.showError(err)
        });
      } else {
        this.departmentService.createDepartment(this.department).subscribe({
          next: (created) => {
            this.departments.push(created);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'departement Created', life: 3000 });
            this.departmentDialog = false;
          },
          error: (err) => this.showError(err)
        });
      }
    }
  }

  findIndexById(id: number): number {
    return this.departments.findIndex(d => d.id === id);
  }

  showMessage(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail });
  }

  showError(err: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message || 'Something went wrong' });
  }

  resetForm() {
    this.submitted = false;
    this.department = { id: 0, nom: '', description: '', type: '', status: '', location: '', budget: 0, manager: '', numberOfEmployees: 0 };
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
exportToCSV() {
  const header = ['ID', 'Name', 'Description', 'Type', 'Status', 'Location', 'Budget', 'Manager', 'Number of Employees'];
  
  // Create CSV rows
  const csvRows = this.departments.map(department => [
    department.id,
    department.nom,
    department.description,
    department.type,
    department.status,
    department.location,
    department.budget,
    department.manager,
    department.numberOfEmployees
  ]);

  // Combine header and rows
  const csvContent = [header, ...csvRows]
    .map(row => row.join(','))
    .join('\n');
    
  // Create a blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);

  // Create a link element to download the CSV file
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'departments.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Remove the link after download
}


}