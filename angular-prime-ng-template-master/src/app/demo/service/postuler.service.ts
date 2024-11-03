// src/app/demo/service/postuler.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class PostulerService {
    private apiUrl = 'http://localhost:8086/demandes/postuler'; 

    constructor(private http: HttpClient) { }

    // Method to post job application data
    applyForJob(jobId: number, applicantData: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.apiUrl, { jobId, ...applicantData }, { headers });
    }
}
