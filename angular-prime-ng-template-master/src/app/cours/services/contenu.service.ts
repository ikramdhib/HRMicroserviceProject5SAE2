// src/app/services/contenu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contenu } from '../models/contenu.model';

@Injectable({
  providedIn: 'root'
})
export class ContenuService {
  private apiUrl = `${environment.API_URL}api/contenus`;

  constructor(private http: HttpClient) {}

  // Lire tous les contenus
  getAllContenus(): Observable<Contenu[]> {
    return this.http.get<Contenu[]>(this.apiUrl);
  }

  // Lire un contenu par ID
  getContenuById(id: number): Observable<Contenu> {
    return this.http.get<Contenu>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un contenu avec fichier
  uploadContenuWithFile(contenu: Contenu, file: File): Observable<Contenu> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', contenu.titre);
    formData.append('type', contenu.type);
    formData.append('ordre', contenu.ordre.toString());
    formData.append('sectionId', contenu.sectionId.toString());

    return this.http.post<Contenu>(`${this.apiUrl}/uploadWithContent`, formData);
  }

  // Ajouter un contenu sans fichier (si nécessaire)
  createContenu(contenu: Contenu): Observable<Contenu> {
    return this.http.post<Contenu>(this.apiUrl, contenu);
  }

  // Mettre à jour un contenu
  updateContenu(id: number, contenu: Contenu): Observable<Contenu> {
    return this.http.put<Contenu>(`${this.apiUrl}/${id}`, contenu);
  }

  // Supprimer un contenu
  deleteContenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
