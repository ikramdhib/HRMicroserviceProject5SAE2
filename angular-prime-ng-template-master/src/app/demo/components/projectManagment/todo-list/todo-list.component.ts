import { Component, OnInit } from '@angular/core';
import { TachesService } from '../Services/taches.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  allTaches: any[] = [];
  
  tachesPlanifier: any[] = [];
  tachesEnCours: any[] = [];
  tachesTerminer: any[] = [];
  id:any;
  constructor(private route: ActivatedRoute,private tacheService: TachesService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); 
    });
    this.getAllTachesWithUserIdAndProjectId(this.id, 3);
  }

  getAllTachesWithUserIdAndProjectId(userId: number, projectId: number) {
    this.tacheService.getAllTachesByUserIdProjectId(userId, projectId).subscribe({
      next: (res) => {
        this.allTaches = res;
        this.updateLists();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches:', err);
      }
    });
  }

  updateLists() {
    this.tachesPlanifier = this.allTaches.filter(tache => tache.status === 'PLANIFIER');
    this.tachesEnCours = this.allTaches.filter(tache => tache.status === 'EN_COUR');
    this.tachesTerminer = this.allTaches.filter(tache => tache.status === 'TERMINER');
  }

  onDragStart(event: DragEvent, task: any) {
    event.dataTransfer?.setData('application/json', JSON.stringify(task));
    event.dataTransfer!.effectAllowed = "move";
  }

  onDrop(event: DragEvent, targetList: string) {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('application/json');
    if (taskData) {
      const task: any = JSON.parse(taskData);
      this.updateTaskStatus(task.id, targetList); // Appelez ici la méthode updateStatus
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Nécessaire pour permettre le dépôt
  }

  updateStatus(id: any, status: any) {
    this.tacheService.updateStatus(id, status).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'Le statut de la tâche a été modifié avec succès' });
        
        // Mettez à jour la liste des tâches après la modification
        const taskIndex = this.allTaches.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
          this.allTaches[taskIndex] = res; // Mettez à jour la tâche avec la réponse
          this.updateLists(); // Mettre à jour les listes après la modification
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a une erreur lors de la mise à jour du statut' });
      }
    });
  }

  updateTaskStatus(id: any, targetList: string) {
    let newStatus = '';
    // Définir le nouveau statut en fonction de la liste cible
    if (targetList === 'PLANIFIER') {
      newStatus = 'PLANIFIER';
    } else if (targetList === 'EN_COUR') {
      newStatus = 'EN_COUR';
    } else if (targetList === 'TERMINER') {
      newStatus = 'TERMINER';
    }

    // Appelez updateStatus avec l'identifiant de la tâche et le nouveau statut
    this.updateStatus(id, newStatus);
  }
}
