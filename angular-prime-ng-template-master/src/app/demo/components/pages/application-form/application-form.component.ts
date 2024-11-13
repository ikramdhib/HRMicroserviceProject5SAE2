import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/demo/service/application.service';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  applyForm: FormGroup;
  jobId: any;  // Add a property to hold the jobId

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {
    // Initialize the form with the required fields
    this.applyForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      nbExp: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('jobId'); 
    });
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      console.error('Please fill in all required fields.');
      return;
    }

    const applicationData = { ...this.applyForm.value, jobOffer:{idJob:this.jobId} };  // Add jobId to the form data

    // Call the service to submit the application
    this.applicationService.submitApplication(applicationData).subscribe(
      response => {
        console.log('Application submitted successfully!', response);
        this.router.navigate(['pages/confirmation']);  // Navigate to a confirmation page
      },
      error => {
        console.error('Error submitting application', error);
      }
    );
  }
}