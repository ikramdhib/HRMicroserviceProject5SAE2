import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8086/demandes/postuler';  // Your backend API endpoint

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);
  }
}
