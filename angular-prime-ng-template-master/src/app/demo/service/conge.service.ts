import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../components/pages/conge/Conge';

@Injectable({
    providedIn: 'root',
})
export class CongeService {
    private apiUrl = 'http://localhost:8090/conges';

    constructor(private http: HttpClient) {}

    // Récupérer tous les congés
    getAllConges(): Observable<Conge[]> {
        return this.http.get<Conge[]>(`${this.apiUrl}/allConge`);
    }

    // Ajouter un nouveau congé
    addConge(conge: Conge): Observable<Conge> {
        return this.http.post<Conge>(`${this.apiUrl}/addConge`, conge);
    }

    // Mettre à jour un congé
    updateConge(conge: Conge): Observable<Conge> {
        return this.http.put<Conge>(`${this.apiUrl}/updateConge`, conge);
    }

    // Supprimer un congé par ID
    deleteConge(congeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteConge/${congeId}`);
    }
}
