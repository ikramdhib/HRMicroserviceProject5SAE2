import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { EquipeService } from '../Services/equipe.service';
import { ProjetService } from '../Services/projet.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TachesService } from '../Services/taches.service';
import { Router } from '@angular/router';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  providers: [MessageService, ConfirmationService],

  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  customers3: any[] = []; // This will hold the list of teams with users
  products: any[]=[];

  expandedRows: any = [];
  rowGroupMetadata: any = {};
  isExpanded: boolean = false;
  @ViewChild('filter') filter!: ElementRef;
  userId:any;
  constructor(private router: Router,private tacheService : TachesService, private projetService:ProjetService,  private teamService: EquipeService) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('id')) {
      this.userId = localStorage.getItem('id');
      console.log('user id', this.userId);
      this.getAllUserTeam(this.userId);
      this.getAllProject(this.userId);
    }
     
  }

  onSort() {
      this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
      this.rowGroupMetadata = {};

      if (this.customers3) {
          for (let i = 0; i < this.customers3.length; i++) {
              const rowData = this.customers3[i];
              const teamTitle = rowData.titre;

              if (i === 0) {
                  this.rowGroupMetadata[teamTitle] = { index: 0, size: 1 };
              } else {
                  const previousRowData = this.customers3[i - 1];
                  const previousTeamTitle = previousRowData.titre;
                  if (teamTitle === previousTeamTitle) {
                      this.rowGroupMetadata[teamTitle].size++;
                  } else {
                      this.rowGroupMetadata[teamTitle] = { index: i, size: 1 };
                  }
              }
          }
      }
  }

  expandRow(projectId: number) {
    if (!this.expandedRows.includes(projectId)) {
      // Fetch tasks for the expanded project
      this.tacheService.getAllTachesByProjectId(projectId).subscribe((tasks) => {
        const project = this.products.find((p) => p.id === projectId);
        if (project) {
          project.taches = tasks; // Assign the fetched tasks to the project
        }
      });
    }
  }


  expandAll() {
    this.expandedRows = this.products.map((p) => p.id);
  }

  getAllUserTeam(userId: any) {
    this.teamService.getUseEquipe(userId).subscribe({
      next: (res) => {
        this.customers3 = Array.isArray(res) ? res : res || []; // 'res' should contain the list of teams with users
        this.updateRowGroupMetaData(); // Update the grouping metadata
      },
      error: (err) => {
        console.error('Error fetching teams:', err);
      }
    });
  }

  getAllProject(id:any){
    return this.projetService.getallWithUserId(id).subscribe({
        next:(res)=>{
            this.products= res;
        }
    })
  }

  naviguerAvecId(id: any): void {
    this.router.navigate(['projet/todoList', id]); // Naviguer vers '/mon-chemin/{id}'
  }

  
}
