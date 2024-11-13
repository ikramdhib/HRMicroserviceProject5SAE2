import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoboffersService {
  private apiUrl = environment.API_URL+'joboffers/all'; 

  constructor(private http: HttpClient) {}

  // Fetch all job offers
  getAllJobOffers()  {
    return this.http.get<any>(this.apiUrl);
  }
}