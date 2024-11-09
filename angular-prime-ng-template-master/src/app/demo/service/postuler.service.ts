import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from 'src/app/models/job-offer.model';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class PostulerService {
  private apiUrl = environment.API_URL+'joboffers'; 

  constructor(private http: HttpClient) {}

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }

  createJobOffer(newJobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.apiUrl+'/add', newJobOffer);
  }

  applyForJob(jobId: number, applicantData: any) {
    const apiUrl = `${this.apiUrl}/${jobId}/apply`;
    return this.http.post(apiUrl, applicantData);
  }
}