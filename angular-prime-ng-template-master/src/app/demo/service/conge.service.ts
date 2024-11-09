import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../components/pages/conge/Conge';
import { Status } from '../components/pages/conge/Status';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CongeService {
    private apiUrl = environment.API_URL+'conges';

    constructor(private http: HttpClient) {}

    // Récupérer tous les congés
    getAllConges(): Observable<Conge[]> {
        return this.http.get<Conge[]>(`${this.apiUrl}/`);
    }

    // Ajouter un nouveau congé
    addConge(conge: Conge , id:any): Observable<Conge> {
        return this.http.post<Conge>(`${this.apiUrl}/${id}`, conge);
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
