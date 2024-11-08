import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from 'src/app/models/job-offer.model';
@Injectable({
  providedIn: 'root'
})
export class PostulerService {
  private apiUrl = 'http://localhost:8086/joboffers/add'; 

  constructor(private http: HttpClient) {}

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }

  

  createJobOffer(newJobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.apiUrl, newJobOffer);
  }

  applyForJob(jobId: number, applicantData: any) {
    const apiUrl = `http://localhost:8086/joboffers/${jobId}/apply`;
    return this.http.post(apiUrl, applicantData);
  }
}