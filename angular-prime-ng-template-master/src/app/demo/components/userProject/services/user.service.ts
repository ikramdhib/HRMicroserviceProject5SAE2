import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }

  API_RL=environment.API_URL;

  
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}


    getUser(id:any){
      return this.http.get<any>(`${this.API_RL}users/getUser/${id}`);
    }

    updateUser(user:any,id:any){
      return this.http.put<any>(`${this.API_RL}users/updateUser/${id}`,user);
    }

    changePassword(passData:any){
      return this.http.put<any>(`${this.API_RL}users/updatePass/`,passData);
    }

    getUsersRole(role:any){
      return this.http.get<any>(`${this.API_RL}users/getRole/${role}`);
    }
    deleteUser(id:any){
      return this.http.delete<any>(`${this.API_RL}users/deleteUser/${id}`);
    }
    ajouterUser(user:any){
      return this.http.post<any>(`${this.API_RL}users/addUser`,user);
    }
    getUsersIds(ids:any){
      return this.http.get<any>(`${this.API_RL}users/getUsersIds/${ids}`);
    }
}
