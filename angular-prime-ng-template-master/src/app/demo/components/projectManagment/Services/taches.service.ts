import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TachesService {

  constructor(private http:HttpClient ) { }

  API_RL=environment.API_URL;

  
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  addTache(tache:any){
    return this.http.post<any>(`${this.API_RL}tache/add`,tache );
  }
  getallByIDs(integers:any[]){
    return this.http.get<any>(`${this.API_RL}tache/getAllbyID/${integers}` );
  }
  getAllTachesByProjectId(id:any){
    return this.http.get<any>(`${this.API_RL}tache/getallprojectid/${id}` );
  }
  deleteTache(id:any){
    return this.http.delete<any>(`${this.API_RL}tache/delete/${id}` );
  }
  getAllTachesByUserIdProjectId(userID:any,ProjectId:any){ 
    return this.http.get<any>(`${this.API_RL}tache/getusertaches/${userID}/${ProjectId}` );
  }
  updateStatus(id:any,status:any){ 
    return this.http.put<any>(`${this.API_RL}tache/updateStatus/${id}/${status}`,null );
  }
}
