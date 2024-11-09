import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/demo/service/application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  applyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService
  ) {
    // Initialize the form with the appropriate fields
    this.applyForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      nbExp: ['', [Validators.required, Validators.min(0)]],
      cvPath: [null],  // Placeholder for CV File
      coverLetterPath: [null]  // Placeholder for Cover Letter File
    });
  }

  ngOnInit(): void { }

  // Capture the CV file input
  onFileChangeCv(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applyForm.patchValue({ cvPath: file });
    }
  }

  // Capture the Cover Letter file input
  onFileChangeCoverLetter(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applyForm.patchValue({ coverLetterPath: file });
    }
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      console.error('Please fill in all required fields.');
      return;
    }

    const applicationData = new FormData();

    // Loop over each form control and append its value to the FormData
    Object.keys(this.applyForm.controls).forEach(key => {
      const control = this.applyForm.get(key);
      if (control && control.value !== null) {
        if (key === 'cvPath' || key === 'coverLetterPath') {
          const file = control.value;
          if (file && file instanceof File) {
            applicationData.append(key, file, file.name);
          }
        } else {
          applicationData.append(key, control.value);
        }
      }
    });

    // Call the service to submit the application
    this.applicationService.submitApplication(applicationData).subscribe(
      response => {
        console.log('Application submitted successfully!', response);
        this.router.navigate(['/confirmation']);  // Navigate to a confirmation page
      },
      error => {
        console.error('Error submitting application', error);
      }
    );
  }
}
