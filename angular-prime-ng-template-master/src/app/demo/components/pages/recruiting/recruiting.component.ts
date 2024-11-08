import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostulerService } from 'src/app/demo/service/postuler.service';
import { JobOffer } from 'src/app/models/job-offer.model';

@Component({
  selector: 'app-recruiting',
  templateUrl: './recruiting.component.html',
  styleUrls: ['./recruiting.component.scss']
})
export class RecruitingComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  sortOptions: any[] = [];
  sortField!: keyof JobOffer;
  sortOrder!: number;

  // New property to hold the new job offer data
  newJobOffer: JobOffer = {
    idJob: 0,             
    title: '',
    description: '',
    competence: '',       
    nbreExperience: 0,    
    dateFin: new Date(),  
    salary: 0
  };

  constructor(private postulerService: PostulerService, private router: Router) {}

  ngOnInit(): void {
    // Check if job offers are stored in localStorage
    const storedJobOffers = localStorage.getItem('jobOffers');
    if (storedJobOffers) {
      // Parse and load the job offers from localStorage
      this.jobOffers = JSON.parse(storedJobOffers);
      this.filteredJobOffers = [...this.jobOffers];
    } else {
      // Fetch from API if not found in localStorage
      this.postulerService.getJobOffers().subscribe(
        (data) => {
          this.jobOffers = data;
          this.filteredJobOffers = [...this.jobOffers];
          this.saveJobOffersToLocalStorage(); // Store fetched data in localStorage
          this.sortOffers();
        },
        (error) => {
          console.error('Error fetching job offers', error);
        }
      );
    }

    this.sortOptions = [
      { label: 'Salary Low to High', value: 'salary' },
      { label: 'Salary High to Low', value: '!salary' },
      { label: 'Experience Required', value: 'experience' }
    ];
    this.sortField = 'salary';
    this.sortOrder = 1;
  }

  // Method to save job offers to localStorage
  saveJobOffersToLocalStorage() {
    localStorage.setItem('jobOffers', JSON.stringify(this.jobOffers));
  }

  // Apply for job - navigate to application form with selected job
  applyForJob(job: JobOffer) {
    this.router.navigate(['/ApplicationForm'], { state: { job: job } });
  }

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

  sortOffers() {
    this.filteredJobOffers.sort((a, b) => {
      let result = 0;

      if (a[this.sortField] instanceof Date && b[this.sortField] instanceof Date) {
        result = a[this.sortField].toString().localeCompare(b[this.sortField].toString());
      } else if (a[this.sortField] < b[this.sortField]) {
        result = -1;
      } else if (a[this.sortField] > b[this.sortField]) {
        result = 1;
      }
      
      return result * this.sortOrder;
    });

    // After sorting, store the updated jobOffers in localStorage
    this.saveJobOffersToLocalStorage();
  }

  onFilter(dv: any, event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredJobOffers = this.jobOffers.filter(job => job.title.toLowerCase().includes(query));
    this.sortOffers();
  }

  onSubmit() {
    // Call the service to create the job offer
    this.postulerService.createJobOffer(this.newJobOffer).subscribe(
      (response) => {
        // Add the new job offer to the list
        this.jobOffers.push(response);
        this.filteredJobOffers = [...this.jobOffers];
        this.sortOffers();

        // Save the updated list to localStorage
        this.saveJobOffersToLocalStorage();

        // Reset the form
        this.newJobOffer = {
          idJob: 0,
          title: '',
          description: '',
          competence: '',
          nbreExperience: 0,
          dateFin: new Date(),
          salary: 0
        };
      },
      (error) => {
        console.error('Error creating job offer', error);
        alert('There was an error creating the job offer. Please try again.');
      }
    );
  }

}
