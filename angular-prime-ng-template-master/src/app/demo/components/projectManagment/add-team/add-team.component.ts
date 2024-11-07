import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeService } from '../Services/equipe.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../userProject/services/user.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
  providers: [MessageService]
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup;
  dropdownItems: any[] = [];
  employees: any[] = [];
  allusers: any[] = [];
  teamMembers: any[] = [];
  submit: boolean = false;
  updateTurn: boolean = false;

  constructor(
    private userServ: UserService,
    private messageService: MessageService,
    private equipeService: EquipeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form
    this.teamForm = this.fb.group({
      teamTitle: ['', Validators.required],
      selectedLead: [null, Validators.required],
      teamMembers: [this.teamMembers || [], Validators.required]
    });

    

    // Fetch users for dropdown and employee list
    this.userServ.getUsersRole("EMPLOYEE").subscribe({
      next: (response) => {
        console.log("Users:", response);
        this.allusers = response;
        this.dropdownItems = this.allusers;
        this.employees = this.allusers;
      },
    });
  }

  get form() {
    return this.teamForm.controls;
  }



  toggleMember(memberId: string) {
    const index = this.teamMembers.indexOf(memberId);
    if (index === -1) {
      this.teamMembers.push(memberId);
    } else {
      this.teamMembers.splice(index, 1);
    }
    this.teamForm.get('teamMembers')?.setValue(this.teamMembers);
  }

  isMemberSelected(memberId: string): boolean {
    return this.teamMembers.includes(memberId);
  }

  submitTeam() {
    this.submit = true;
    if (this.teamForm.valid) {
      const selectedLeadId = this.teamForm.value.selectedLead?.id || null; // Extracting the ID of the selected lead
      const memberIds = this.teamMembers.map((member: any) => member.id); // Mapping to only IDs of team members
  
      const newTeam = {
        titre: this.teamForm.value.teamTitle,
        responsableId: selectedLeadId,
        userIds: memberIds.length > 0 ? memberIds : null // Ensuring this is either an array of IDs or null
      };
  
     
        this.equipeService.addStudent(newTeam).subscribe({
          next: (response) => {
            console.log('Team added successfully', response);
            this.messageService.add({
              severity: 'info',
              summary: 'Confirm',
              detail: 'Team added successfully'
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Reject',
              detail: 'There was an error'
            });
            console.log(error);
          }
        });
    }
  }
  
}
