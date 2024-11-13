import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.API_URL+'demandes/postuler';  // Your backend API endpoint

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);
  }
}
