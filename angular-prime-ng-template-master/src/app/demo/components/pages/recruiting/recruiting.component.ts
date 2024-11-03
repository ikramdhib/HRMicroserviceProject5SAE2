import { Component, OnInit } from '@angular/core';
import { PostulerService } from 'src/app/demo/service/postuler.service';

interface JobOffer {
  id: number;  // Add id property
  title: string;
  description: string;
  experience: number;
  endDate: Date;
  salary: number;
}
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

  constructor(private postulerService: PostulerService) {}

  ngOnInit(): void {
    this.jobOffers = [
      {
        id: 1,
        title: 'Software Development Intern',
        description: 'Work on developing modern web applications.',
        experience: 1,
        endDate: new Date('2024-12-31'),
        salary: 1200
      },
      {
        id: 2,
        title: 'Data Analysis Intern',
        description: 'Analyze data sets and produce meaningful insights.',
        experience: 0,
        endDate: new Date('2024-11-30'),
        salary: 1000
      },
      {
        id: 3,
        title: 'UI/UX Design Intern',
        description: 'Create stunning user interfaces and experiences.',
        experience: 0,
        endDate: new Date('2024-10-15'),
        salary: 1100
      }
    ];

    this.filteredJobOffers = [...this.jobOffers];
    this.sortOptions = [
      { label: 'Salary Low to High', value: 'salary' },
      { label: 'Salary High to Low', value: '!salary' },
      { label: 'Experience Required', value: 'experience' }
    ];
    this.sortField = 'salary';
    this.sortOrder = 1;
  }

  applyForJob(job: JobOffer) {
    const applicantData = {
      name: 'Applicant Name',  // Replace with actual applicant info
      email: 'applicant@example.com'  // Replace with actual applicant info
    };
    
    this.postulerService.applyForJob(job.id, applicantData).subscribe(
      response => {
        console.log(`Successfully applied for: ${job.title}`, response);
      },
      error => {
        console.error(`Error applying for: ${job.title}`, error);
      }
    );
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
      if (a[this.sortField] < b[this.sortField]) {
        result = -1;
      } else if (a[this.sortField] > b[this.sortField]) {
        result = 1;
      }

      return result * this.sortOrder;
    });
  }

  onFilter(dv: any, event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredJobOffers = this.jobOffers.filter(job => job.title.toLowerCase().includes(query));
    this.sortOffers();
  }
}

