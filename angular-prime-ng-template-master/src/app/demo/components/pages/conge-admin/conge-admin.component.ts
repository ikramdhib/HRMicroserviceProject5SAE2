import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CongeService } from 'src/app/demo/service/conge.service';
import { Conge } from '../conge/Conge';
import { Status } from '../conge/Status';

@Component({
  selector: 'app-conge-admin',
  templateUrl: './conge-admin.component.html',
  providers: [MessageService],
})
export class CongeAdminComponent implements OnInit {
  conges: Conge[] = [];

  constructor(private congeService: CongeService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadConges()
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
confirmerConge(conge: Conge) {
  if (conge.id !== undefined) {
    this.congeService.updateStatusConge(conge.id, Status.Valider).subscribe(
      (updatedConge) => {
        conge.statut = Status.Valider; // Mettez à jour le statut localement
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le congé a été confirmé avec succès.',
        });
      },
      (error) => {
        console.error('Erreur lors de la confirmation du congé:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'La confirmation du congé a échoué.',
        });
      }
    );
  } else {
    console.error("L'ID du congé est manquant.");
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Impossible de confirmer un congé sans ID.",
    });
  }
}

  annulerConge(conge: Conge) {
    if (conge.id !== undefined) {
        this.congeService.updateStatusConge(conge.id, Status.Refuser).subscribe(
            (updatedConge) => {
                conge.statut = Status.Refuser; // Mettez à jour le statut localement
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Le congé a été annulé.',
                });
            },
            (error) => {
                console.error('Erreur lors de l\'annulation du congé', error);
            }
        );
    } else {
        console.error('L\'ID du congé est manquant.');
    }
}


}
