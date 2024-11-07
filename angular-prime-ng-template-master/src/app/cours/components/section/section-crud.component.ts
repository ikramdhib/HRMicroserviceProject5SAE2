// section-crud.component.ts
import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-section-crud',
  templateUrl: './section-crud.component.html',
  styleUrls: ['./section-crud.component.css']
})
export class SectionCrudComponent implements OnInit {
  sections: Section[] = [];
  selectedSection: Section | null = null;
  loading: boolean = true;

  constructor(private sectionService: SectionService) {}

  ngOnInit(): void {
    this.loadSections();
  }

  // Charger la liste des sections
  loadSections(): void {
    this.loading = true;
    this.sectionService.getAllSections().subscribe(
      (data) => {
        this.sections = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sections:', error);
        this.loading = false;
      }
    );
  }

  // Appliquer un filtre global
  onGlobalFilter(table: any, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // Effacer les filtres
  clear(table: any): void {
    table.clear();
  }

  // Ajouter une nouvelle section
  addNewSection(): void {
    this.selectedSection = { id: 0, titre: '', ordre: 1, coursId: 1 };
  }

  // Modifier une section existante
  editSection(section: Section): void {
    this.selectedSection = { ...section };
  }

  // Enregistrer la section (ajout ou modification)
  saveSection(): void {
    if (this.selectedSection) {
      if (this.selectedSection.id === 0) {
        this.sectionService.createSection(this.selectedSection).subscribe(() => this.loadSections());
      } else {
        this.sectionService.updateSection(this.selectedSection.id, this.selectedSection).subscribe(() => this.loadSections());
      }
      this.selectedSection = null;
    }
  }

  // Supprimer une section
  deleteSection(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) {
      this.sectionService.deleteSection(id).subscribe(() => this.loadSections());
    }
  }

  // Annuler l'opération en cours
  cancel(): void {
    this.selectedSection = null;
  }
}
