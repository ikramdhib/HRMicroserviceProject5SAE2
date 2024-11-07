// cours-crud.component.ts
import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../models/cours.model';

@Component({
  selector: 'app-cours-crud',
  templateUrl: './cours-crud.component.html',
  styleUrls: ['./cours-crud.component.css']
})
export class CoursCrudComponent implements OnInit {
  coursList: Cours[] = [];
  selectedCours: Cours | null = null;
  loading: boolean = true;

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.loadCours();
  }

  // Charger la liste des cours
  loadCours(): void {
    this.loading = true;
    this.coursService.getAllCours().subscribe(
      (data) => {
        this.coursList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours:', error);
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

  // Ajouter un nouveau cours
  addNewCours(): void {
    this.selectedCours = { id: 0, titre: '', description: '', auteurId: 1, dateCreation: new Date(), dateMiseAJour: new Date() };
  }

  // Modifier un cours existant
  editCours(cours: Cours): void {
    this.selectedCours = { ...cours };
  }

  // Enregistrer les modifications ou ajouter un cours
  saveCours(): void {
    if (this.selectedCours) {
      if (this.selectedCours.id === 0) {
        this.coursService.createCours(this.selectedCours).subscribe(() => this.loadCours());
      } else {
        this.coursService.updateCours(this.selectedCours.id, this.selectedCours).subscribe(() => this.loadCours());
      }
      this.selectedCours = null;
    }
  }

  // Supprimer un cours
  deleteCours(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      this.coursService.deleteCours(id).subscribe(() => this.loadCours());
    }
  }

  // Annuler l'opération en cours
  cancel(): void {
    this.selectedCours = null;
  }
}
