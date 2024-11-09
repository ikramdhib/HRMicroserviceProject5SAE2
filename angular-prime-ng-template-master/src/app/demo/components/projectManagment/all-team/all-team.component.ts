import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EquipeService } from '../Services/equipe.service';
import { AddTeamComponent } from '../add-team/add-team.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddProjetComponent } from '../add-projet/add-projet.component'; 
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditTeamComponent } from '../edit-team/edit-team.component';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-all-team',
  templateUrl: './all-team.component.html',
  providers: [DynamicDialogConfig,MessageService, ConfirmationService,DialogService],
  styleUrls: ['./all-team.component.scss']
})
export class AllTeamComponent implements OnInit {

  ref: DynamicDialogRef | undefined;


  teams: any[] = [];

  expandedRows: expandedRows = {};

  isExpanded: boolean = false;

  loading: boolean = true;


  constructor(private messageService: MessageService,private confirmationService: ConfirmationService,private dialogService: DialogService,private EquipeService :EquipeService) { }

  ngOnInit() {
    
      this.getAllEquipes();
  }

  openDialog(team: any) {
    console.log(team)
    this.ref = this.dialogService.open(EditTeamComponent, {
      header: 'Modifier Projet',
      width: '30%',
      data: {team}
    });
  }
  confirmDelete(id:any) {
    this.confirmationService.confirm({
        key: 'confirm1',
        message: 'Are you sure to perform this action?',
        accept: () => {
         
        },
    });
}

  getAllEquipes(){
    return this.EquipeService.getAllEqupes().subscribe({
      next:(res)=>{
        this.teams=res
      }
    })
  }

  deleteEquipe(id:any){
    return this.EquipeService.deleteTeam(id).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le projet est suprimé avec succés' });
        
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

      }
    })
  }


}
