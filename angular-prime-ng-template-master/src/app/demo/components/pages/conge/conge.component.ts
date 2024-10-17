import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Conge } from './Conge';
import { CongeService } from 'src/app/demo/service/conge.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './conge.component.html',
  providers: [MessageService]
})
export class CongeComponent implements OnInit {

    conges: Conge[] = [];
    congeForm: FormGroup;
    submitted = false; // Ajoutez cette propriété
    display: boolean = false; 
    selectedConge: any;
    displayDeleteDialog: boolean = false; 
    
   

    constructor(private congeService: CongeService, private messageService: MessageService,private fb: FormBuilder) { 
      this.congeForm = this.fb.group({
        type: ['', Validators.required],
        date_debut: ['', Validators.required],
        date_fin: ['', Validators.required],
        duree: [0, [Validators.required, Validators.min(1)]],
        raison: ['', Validators.required],
        statut: ['', Validators.required]
      });
       // Écoute les changements sur les champs date_debut et date_fin
  this.congeForm.get('date_debut')?.valueChanges.subscribe(() => this.updateDuration());
  this.congeForm.get('date_fin')?.valueChanges.subscribe(() => this.updateDuration());
    }

    ngOnInit() {
      this.loadConges();
    }

    loadConges() {
      this.congeService.getAllConges().subscribe(
        (data: Conge[]) => {
          this.conges = data;
          console.log('Congés chargés:', this.conges);
        },
        (error) => {
          console.error('Erreur lors du chargement des congés:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les congés.' });
        }
      );
    }

    addConge(): void { 
      this.submitted = true; // Marquez le formulaire comme soumis
    
      if (this.congeForm.valid) {
        const formValues = this.congeForm.value; // Obtenez les valeurs du formulaire
    
        // Convertir les dates en format ISO (UTC)
        const dateDebut = new Date(formValues.date_debut).toISOString();
        const dateFin = new Date(formValues.date_fin).toISOString();
    
        // Calculer la durée en jours entre les deux dates (déjà mis à jour via updateDuration)
        const newConge: Conge = {
          type: formValues.type,
          date_debut: dateDebut,
          date_fin: dateFin,
          duree: formValues.duree, // Utiliser la durée déjà calculée
          statut: formValues.statut,
          raison: formValues.raison
        };
    
        console.log('Conge à ajouter:', newConge);
    
        this.congeService.addConge(newConge).subscribe(
          (response) => {
            console.log('Congé ajouté avec succès!', response);
            this.congeForm.reset(); // Réinitialiser le formulaire
            this.submitted = false; // Réinitialisez la propriété
            this.display = false; // Fermez le dialog
            this.loadConges();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du congé', error);
          }
        );
      }
    }
  private updateDuration(): void {
    const dateDebut = this.congeForm.get('date_debut')?.value;
    const dateFin = this.congeForm.get('date_fin')?.value;
  
    if (dateDebut && dateFin) {
      const duration = this.calculateDuration(dateDebut, dateFin);
      this.congeForm.patchValue({ duree: duration }); // Mettre à jour la durée
    }
  }
  
  // Fonction pour calculer la durée en jours entre deux dates
  private calculateDuration(dateDebut: string, dateFin: string): number {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)); // Conversion en jours
    return duration;
  }
  
    onHide() {
      this.congeForm.reset(); // Réinitialiser le formulaire lorsque le dialog est fermé
      this.submitted = false; // Réinitialisez la propriété
      this.display = false; // Fermer le dialog
    }
  

  openDialog() {
    this.display = true;
  }

    updateConge(conge: Conge) {
     
    }
    onDelete(conge: any): void {
      this.selectedConge = conge;
      this.displayDeleteDialog = true;
    }

     // Confirmer la suppression
  confirmDelete(): void {
    if (this.selectedConge && this.selectedConge.id) {
      this.congeService.deleteConge(this.selectedConge.id).subscribe(() => {
        // Supprimer le congé de la liste locale après suppression
        this.conges = this.conges.filter(c => c.id !== this.selectedConge.id);

        // Fermer la boîte de dialogue
        this.displayDeleteDialog = false;

        // Afficher un message de confirmation (facultatif)
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le congé a été supprimé avec succès' });
      }, error => {
        // Gérer les erreurs
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La suppression du congé a échoué' });
      });
    }
  }
}

