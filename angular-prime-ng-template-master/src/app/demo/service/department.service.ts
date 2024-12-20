import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Department } from '../components/pages/Departement/Department'; // Adjust this path
import { Utilisateur } from '../components/pages/Departement/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl=environment.API_URL+'api/departements';

  //private apiUrlll = 'http://localhost:8070/api/departements';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}`);
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}`, department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    console.log(`Sending DELETE request for department ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

addDepartmentAndAssignToUsers(department: Department, userIds: number[]): Observable<Department> {
  const url = `${this.apiUrl}/addDepartmentAndAssignToUsers`;
  return this.http.post<Department>(url, department, { params: { userIds: userIds.join(',') } });
}

getUsersByDepartment(departmentId: number): Observable<Utilisateur[]> {
  return this.http.get<Utilisateur[]>(`${this.apiUrl}/${departmentId}/users`);
}

 
}
