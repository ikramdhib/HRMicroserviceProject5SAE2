import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http:HttpClient ) { }

  API_RL=environment.API_URL;

  
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  addStudent(equipe:any){
    return this.http.post<any>(`${this.API_RL}equipe/add`,equipe );
  }

  users(){
    return this.http.get<any>(`${this.API_RL}equipe/users`);
  }
  getAllEqupes(){
    return this.http.get<any>(`${this.API_RL}equipe/all`);
  }
  deleteTeam(id:any){
    return this.http.delete<any>(`${this.API_RL}equipe/delete/${id}`);
  }
  updateEquipe(equipe:any){
    return this.http.put<any>(`${this.API_RL}equipe/update`,equipe);
  }
  getUseEquipe(id:any){
    return this.http.get<any>(`${this.API_RL}equipe/geteUserEquiep/${id}`);
  }

 
}
