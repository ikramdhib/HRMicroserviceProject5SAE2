import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../components/pages/conge/Conge';
import { Status } from '../components/pages/conge/Status';

@Injectable({
    providedIn: 'root',
})
export class CongeService {
    private apiUrl = 'http://localhost:8090/conges';

    constructor(private http: HttpClient) {}

    // Récupérer tous les congés
    getAllConges(): Observable<Conge[]> {
        return this.http.get<Conge[]>(`${this.apiUrl}/`);
    }

    // Ajouter un nouveau congé
    addConge(conge: Conge): Observable<Conge> {
        return this.http.post<Conge>(`${this.apiUrl}/`, conge);
    }

    // Mettre à jour un congé
    updateConge(conge: Conge): Observable<Conge> {
        return this.http.put<Conge>(`${this.apiUrl}/`, conge);
    }
    // Méthode pour mettre à jour le statut d'un congé
updateStatusConge(congeId: number, statut: Status): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${congeId}`, { statut });
}

    // Supprimer un congé par ID
    deleteConge(congeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${congeId}`);
    }
}
