import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  
  API_RL=environment.API_URL;

  constructor(private http:HttpClient ) { }

  addProject(projet:any){
    return this.http.post<any>(`${this.API_RL}projet/addProject`,projet);
  }
  getAllProject(){
    return this.http.get<any>(`${this.API_RL}projet/all`);
  }
  getOneProject(id:any){
    return this.http.get<any>(`${this.API_RL}projet/getProjet/${id}`);
  }
  deletePrpjet(id:any){
    return this.http.delete<any>(`${this.API_RL}projet/delete/${id}`);
  }
  updatePrpjet(projet:any){
    return this.http.put<any>(`${this.API_RL}projet/update`,projet);
  }
  getallWithUserId(id:any){
    return this.http.get<any>(`${this.API_RL}projet/getprojetWithUserId/${id}`);
  }
  getCountProject(){
    return this.http.get<any>(`${this.API_RL}projet/count`);
  }
  getDistrubutedProject(){
    return this.http.get<any>(`${this.API_RL}projet/distribution`);
  }

}
