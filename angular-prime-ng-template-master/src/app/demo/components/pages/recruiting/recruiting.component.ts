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
  sortField: keyof JobOffer = 'salary'; // Type-safe initialization
  sortOrder: number = 1; // Default ascending order

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
    const storedJobOffers = localStorage.getItem('jobOffers');
    if (storedJobOffers) {
      this.jobOffers = JSON.parse(storedJobOffers);
      this.filteredJobOffers = [...this.jobOffers];  // Initialize filtered offers
    } else {
      this.postulerService.getJobOffers().subscribe(
        (data) => {
          this.jobOffers = data;
          this.filteredJobOffers = [...this.jobOffers];
          this.saveJobOffersToLocalStorage();
          this.sortOffers();
        },
        (error) => {
          console.error('Error fetching job offers', error);
        }
      );
    }

    // Sort options configuration
    this.sortOptions = [
      { label: 'Salary Low to High', value: 'salary' },
      { label: 'Salary High to Low', value: '!salary' },
      { label: 'Experience Required', value: 'nbreExperience' }
    ];
  }

  // Store job offers in local storage
  saveJobOffersToLocalStorage() {
    localStorage.setItem('jobOffers', JSON.stringify(this.jobOffers));
  }

  // Navigate to ApplicationForm with the selected job offer
  applyForJob(job: JobOffer) {
    this.router.navigate(['pages/confirmation'], { state: { job } });
  }

  // Handle sorting
  onSortChange(event: any) {
    const value = event.value;
    this.sortOrder = value.startsWith('!') ? -1 : 1;
    this.sortField = value.replace('!', '') as keyof JobOffer;
    this.sortOffers();
  }

  // Sorting logic
  sortOffers() {
    this.filteredJobOffers = [...this.jobOffers].sort((a, b) => {
      let result = 0;
      if (a[this.sortField] < b[this.sortField]) {
        result = -1;
      } else if (a[this.sortField] > b[this.sortField]) {
        result = 1;
      }
      return result * this.sortOrder;
    });
    this.saveJobOffersToLocalStorage();
  }

  // Filtering method
  onFilter(dv: any, event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredJobOffers = this.jobOffers.filter(job => job.title.toLowerCase().includes(query));
    this.sortOffers();
  }

  // Submit new job offer
  onSubmit() {
    this.postulerService.createJobOffer(this.newJobOffer).subscribe(
      (response) => {
        this.jobOffers.push(response);
        this.filteredJobOffers = [...this.jobOffers];
        this.sortOffers();
        this.saveJobOffersToLocalStorage();

        this.newJobOffer = {
          idJob: 0,
          title: '',
          description: '',
          competence: '',
          nbreExperience: 0,
          dateFin: new Date(),
          salary: 0
        };

        // Navigate to the AnnonceComponent to show the created offer
        //this.router.navigate(['/Annonces']);
      },
      (error) => {
        console.error('Error creating job offer', error);
        alert('There was an error creating the job offer. Please try again.');
      }
    );
  }
}