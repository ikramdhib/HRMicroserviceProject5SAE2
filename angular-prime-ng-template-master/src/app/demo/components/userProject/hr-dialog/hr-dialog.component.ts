import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hr-dialog',
  templateUrl: './hr-dialog.component.html',
  styleUrls: ['./hr-dialog.component.scss'],
  providers: [DialogService, MessageService]

})
export class HrDialogComponent implements OnInit {
  employeeForm: FormGroup;
  submit: boolean = false; // Pour gérer la soumission

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    public config: DynamicDialogConfig // Injection des données
  ) {
    const employee = config.data?.employee;
  
    this.employeeForm = this.fb.group({
      username: [employee?.username || '', Validators.required],
      cin: [employee?.cin || '', Validators.required],
      phone: [employee?.phone || '', Validators.required],
      email: [employee?.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    
  }

  get formControls() {
    return this.employeeForm.controls;
  }
  submitEmployee() {
    this.submit = true;
    const employeeData = {
      username: this.employeeForm.value.username,
      email: this.employeeForm.value.email,
      phone: this.employeeForm.value.phone,
      cin: this.employeeForm.value.cin,
      role: 'HR',
      password: this.employeeForm.value.cin 
    };
    if (this.employeeForm.valid) {
  
      if (this.config.data?.employee) {
        // Mise à jour
        this.userService.updateUser(employeeData,this.config.data.employee.id ).subscribe({
          next: (res) => {
            console.log('Employee updated successfully', res);
            this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: "L'utilisateur modifié avec succès" });
            this.employeeForm.reset();
            this.submit = false;
          },
          error: (err) => {
            console.error('Error updating employee', err);
            this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a une erreur' });
          }
        });
      } else {
        // Ajout
        employeeData.role = 'EMPLOYEE';
        employeeData.password = employeeData.cin; // Exemple : Générer un mot de passe par défaut basé sur le CIN
  
        this.userService.ajouterUser(employeeData).subscribe({
          next: (res) => {
            console.log('Employee added successfully', res);
            this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: "L'utilisateur ajouté avec succès" });
            this.employeeForm.reset();
            this.submit = false;
          },
          error: (err) => {
            console.error('Error adding employee', err);
            this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a une erreur' });
          }
        });
      }
    }
  }

}
