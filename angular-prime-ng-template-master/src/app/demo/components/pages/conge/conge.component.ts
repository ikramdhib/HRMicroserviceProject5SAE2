import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Conge } from './Conge';
import { CongeService } from 'src/app/demo/service/conge.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    templateUrl: './conge.component.html',
    providers: [MessageService],
})
export class CongeComponent implements OnInit {
    conges: Conge[] = [];
    congeForm: FormGroup;
    submitted = false;
    display: boolean = false;
    selectedConge: any;
    selectedConge2: Conge = {
        type: '',
        date_debut: '',
        date_fin: '',
        duree: 0,
        statut: "",
        raison: ''
      };
    displayDeleteDialog: boolean = false;
    displayEditDialog: boolean = false;

    constructor(
        private congeService: CongeService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {
        this.congeForm = this.fb.group({
            type: ['', Validators.required],
            date_debut: ['', [Validators.required, this.dateDebutValidator]],
            date_fin: [
                '',
                [Validators.required, this.dateFinValidator.bind(this)],
            ],
            duree: [0, [Validators.required, Validators.min(1)]],
            raison: ['', Validators.required],
        });
        // Écoute les changements sur les champs date_debut et date_fin
        this.congeForm
            .get('date_debut')
            ?.valueChanges.subscribe(() => this.updateDuration());
        this.congeForm
            .get('date_fin')
            ?.valueChanges.subscribe(() => this.updateDuration());
    }
    // Validateur pour date_debut
    private dateDebutValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const today = new Date();
        const selectedDate = new Date(control.value);

        return selectedDate < today ? { dateDebutInvalid: true } : null;
    }
    // Validateur pour la date de fin
    dateFinValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const dateDebut = this.congeForm?.get('date_debut')?.value;
        const dateFin = new Date(control.value);

        if (dateDebut && dateFin <= new Date(dateDebut)) {
            return { dateFinInvalid: true };
        }
        return null;
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
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les congés.',
                });
            }
        );
    }

    addConge(): void {
        this.submitted = true;

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
                statut: "EnCours",
                duree: formValues.duree,
                raison: formValues.raison,
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
                    console.error("Erreur lors de l'ajout du congé", error);
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
        const duration = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        ); // Conversion en jours
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
    // Ouvrir le dialogue pour modifier un congé
    openEditDialog(conge: Conge): void {
        this.selectedConge2 = { ...conge }; // Clone du congé sélectionné pour éviter de modifier directement
        this.congeForm.patchValue({
            type: conge.type,
            date_debut: conge.date_debut,
            date_fin: conge.date_fin,
            duree: conge.duree,
            raison: conge.raison
        });
        if (conge.date_debut && conge.date_fin) {
            this.updateDuration();
        }
        this.displayEditDialog = true; // Ouvrir le dialogue
    }

    // Fermer le dialogue
    closeDialog(): void {
        this.displayEditDialog = false;
    }
    updateConge(): void {
        // Mettre à jour le congé avec les valeurs du formulaire
    const updatedConge: Conge = {
        ...this.selectedConge2, // Conserver l'ID pour l'update
        ...this.congeForm.value // Prendre les nouvelles valeurs du formulaire
    };

    this.congeService.updateConge(updatedConge).subscribe(
        (response: Conge) => {
            this.loadConges(); // Rafraîchir la liste après modification
            this.closeDialog(); // Fermer le dialogue
        },
        (error) => {
            console.error('Erreur lors de la mise à jour du congé :', error);
        }
    );
    }

    
    onDelete(conge: any): void {
        this.selectedConge = conge;
        this.displayDeleteDialog = true;
    }

    // Confirmer la suppression
    confirmDelete(): void {
        if (this.selectedConge && this.selectedConge.id) {
            this.congeService.deleteConge(this.selectedConge.id).subscribe(
                () => {
                    // Supprimer le congé de la liste locale après suppression
                    this.conges = this.conges.filter(
                        (c) => c.id !== this.selectedConge.id
                    );

                    // Fermer la boîte de dialogue
                    this.displayDeleteDialog = false;

                    // Afficher un message de confirmation (facultatif)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Le congé a été supprimé avec succès',
                    });
                },
                (error) => {
                    // Gérer les erreurs
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'La suppression du congé a échoué',
                    });
                }
            );
        }
    }
}
