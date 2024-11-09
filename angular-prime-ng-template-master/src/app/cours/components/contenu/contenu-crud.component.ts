// contenu-crud.component.ts
import { Component, OnInit } from '@angular/core';
import { ContenuService } from '../../services/contenu.service';
import { Contenu } from '../../models/contenu.model';

@Component({
  selector: 'app-contenu-crud',
  templateUrl: './contenu-crud.component.html',
  styleUrls: ['./contenu-crud.component.css']
})
export class ContenuCrudComponent implements OnInit {
  contenus: Contenu[] = [];
  selectedContenu: Contenu | null = null;
  selectedFile: File | null = null;
  loading: boolean = true;
  userRole:any;
  isEmployee: boolean = false;
  constructor(private contenuService: ContenuService) {}

  ngOnInit(): void {
    this.loadContenus();
    if (localStorage.hasOwnProperty('userRole')) {
      this.userRole = localStorage.getItem('userRole');
      console.log('user id', this.userRole);
      this.isEmployee = this.userRole === 'EMPLOYEE';
    }

  }

  // Charger la liste des contenus
  loadContenus(): void {
    this.loading = true;
    this.contenuService.getAllContenus().subscribe(
      (data) => {
        this.contenus = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des contenus:', error);
        this.loading = false;
      }
    );
  }

  // Méthode pour appliquer un filtre global
  onGlobalFilter(table: any, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // Méthode pour effacer les filtres
  clear(table: any): void {
    table.clear();
  }

  // Ajouter un nouveau contenu
  addNewContenu(): void {
    this.selectedContenu = { id: 0, titre: '', type: 'pdf', ordre: 1, sectionId: 1 };
  }

  // Modifier un contenu existant
  editContenu(contenu: Contenu): void {
    this.selectedContenu = { ...contenu };
  }

  // Enregistrer les modifications ou ajouter un contenu
  saveContenu(): void {
    if (this.selectedContenu) {
      if (this.selectedContenu.id === 0) {
        if (this.selectedFile) {
          this.contenuService.uploadContenuWithFile(this.selectedContenu, this.selectedFile)
            .subscribe(() => {
              this.loadContenus();
              this.selectedContenu = null;
              this.selectedFile = null;
            });
        }
      } else {
        this.contenuService.updateContenu(this.selectedContenu.id, this.selectedContenu)
          .subscribe(() => {
            this.loadContenus();
            this.selectedContenu = null;
            this.selectedFile = null;
          });
      }
    }
  }

  // Sélectionner un fichier pour l'upload
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Supprimer un contenu
  deleteContenu(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      this.contenuService.deleteContenu(id).subscribe(() => this.loadContenus());
    }
  }

  // Annuler l'opération en cours
  cancel(): void {
    this.selectedContenu = null;
    this.selectedFile = null;
  }
}
