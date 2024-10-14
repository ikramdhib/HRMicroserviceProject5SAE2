import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EquipeService } from '../Services/equipe.service';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService,MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
  providers: [DynamicDialogConfig,ConfirmationService,MessageService]
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup; 
  dropdownItems: any[] = []; 
  employees: any[] = [];  
  allusers: any[] = []; 
  teamMembers: any[] = []; 
  submit:boolean=false;
  updateTurn:boolean=false;
  
  constructor(public config: DynamicDialogConfig,private messageService: MessageService,private equipeService: EquipeService, private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form
   

    this.teamForm = this.fb.group({
      teamTitle: ['',Validators.required ],
      selectedLead: [null,Validators.required ],
      teamMembers: [this.teamMembers || [] ,Validators.required ] // Initialisez le FormArray
    });

    if (this.config.data && this.config.data.team) {
      this.updateTurn = true;
      this.populateForm(this.config.data.team); // Pré-remplir le formulaire avec les données existantes
    }

    // Fetch users for dropdown and employee list
    this.equipeService.users().subscribe({
      next: (response) => {
        console.log("*******",response)
        this.allusers = response;
        this.dropdownItems = this.allusers

        this.employees = this.allusers;
      },
    });
  }
  get form() {
    return this.teamForm.controls;
  }

  populateForm(team: any) {
    this.teamForm.patchValue({
      teamTitle: team.titre,
      selectedLead: team.responsable,
      teamMembers: team.users
    });
    this.teamMembers = team.users; // Mettre à jour les membres de l'équipe sélectionnés
  }

  toggleMember(member: string) {
    const index = this.teamMembers.indexOf(member);
    if (index === -1) {
      this.teamMembers.push(member); 
    } else {
      this.teamMembers.splice(index, 1); 
    }   
    this.teamForm.get('teamMembers')?.setValue(this.teamMembers);
  }
 
  isMemberSelected(member: string): boolean {
    return this.teamMembers.includes(member);
  }

  
  submitTeam() {
    this.submit = true;
    if(this.teamForm.valid){
      if(!this.updateTurn){
    const newTeam = {
      titre: this.teamForm.value.teamTitle,
      responsable: this.teamForm.value.selectedLead,
      users: this.teamMembers
    };

    console.log(newTeam,"88888888888888")

    this.equipeService.addStudent(newTeam).subscribe({
      next: (response) => {
        console.log('Team added successfully', response);
        this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'l equipe est ajouté avec succés' });
      },
      error:(error)=>{
           
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });
          
        console.log(error)
      }
    });
  }
  else{
    const newTeam = {
      id:this.config.data.team.id,
      titre: this.teamForm.value.teamTitle,
      responsable: this.teamForm.value.selectedLead,
      users: this.teamMembers
    };

    this.equipeService.updateEquipe(newTeam).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le projet a été modifier avec succés' });
        console.log(res);
        
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

      }
    })
  }
}
}
}
