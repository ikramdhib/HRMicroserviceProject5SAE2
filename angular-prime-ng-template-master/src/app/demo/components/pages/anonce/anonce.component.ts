import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOffer } from 'src/app/models/job-offer.model';
import { JoboffersService } from 'src/app/demo/service/joboffers.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './anonce.component.html',
  styleUrls: ['./anonce.component.scss']
})
export class AnonceComponent implements OnInit {
  jobOffers: any[] = [];
  sortOptions: any[] = [];
  sortField: keyof JobOffer = 'salary';  // Default sort field
  sortOrder: number = 1;  // Default sort order (ascending)

  constructor(
    private joboffersServices: JoboffersService,
    private router: Router  // Inject the router for navigation
  ) {}

  ngOnInit(): void {
    // Fetch job offers using the service
    this.joboffersServices.getAllJobOffers().subscribe(
      (data) => {
        this.jobOffers = data;
        console.log(this.jobOffers)
       this.sortOffers(); // Sort the job offers after fetching
      },
      (error) => {
        console.error('Error fetching job offers', error);
      }
    );

    

    // Sort options configuration
    this.sortOptions = [
      { label: 'Salary Low to High', value: 'salary' },
      { label: 'Salary High to Low', value: '!salary' },
      { label: 'Experience Required', value: 'nbreExperience' }
    ];
  }

  // Sorting method
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1) as keyof JobOffer;
    } else {
      this.sortOrder = 1;
      this.sortField = value as keyof JobOffer;
    }

    this.sortOffers();
  }

  // Sorting function
  sortOffers() {
    this.jobOffers.sort((a, b) => {
      let result = 0;

      if (a[this.sortField] < b[this.sortField]) {
        result = -1;
      } else if (a[this.sortField] > b[this.sortField]) {
        result = 1;
      }

      return result * this.sortOrder;
    });
  }

  // Filtering method
  onFilter(dv: any, event: any) {
    const query = event.target.value.toLowerCase();
    this.jobOffers = this.jobOffers.filter(job => job.title.toLowerCase().includes(query));
    this.sortOffers();  // Reapply sorting after filtering
  }

  // Method to navigate to ApplicationFormComponent with job id
  applyForJob(jobId: number) {
    this.router.navigate(['pages/application-form', jobId ]);

  }
}