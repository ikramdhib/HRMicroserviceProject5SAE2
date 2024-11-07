import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../userProject/services/user.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EquipeService } from '../Services/equipe.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
  providers: [ MessageService]

})
export class EditTeamComponent implements OnInit {

  teamForm!: FormGroup;
  dropdownItems: any[] = [];
  employees: any[] = [];
  allusers: any[] = [];
  teamMembers: any[] = [];
  submit: boolean = false;
  updateTurn: boolean = false;

  constructor(
    private userServ: UserService,
    public config: DynamicDialogConfig,
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

    if ( this.config.data?.team) {
      console.log("this.config.data?.team",this.config.data?.team)
      this.updateTurn = true;
      this.populateForm(this.config.data?.team);
    }

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

  populateForm(team: any) {
    this.teamForm.patchValue({
      teamTitle: team.titre,
      selectedLead: team.responsable,
      teamMembers: team.members
    });
    this.teamMembers = team.members;
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
        id: this.updateTurn ? this.config.data.team.id : undefined,
        titre: this.teamForm.value.teamTitle,
        responsableId: selectedLeadId,
        userIds: memberIds.length > 0 ? memberIds : null // Ensuring this is either an array of IDs or null
      };
  
      if (!this.updateTurn) {
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
      } else {
        this.equipeService.updateEquipe(newTeam).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Confirm',
              detail: 'Team updated successfully'
            });
            console.log(res);
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
  

}
