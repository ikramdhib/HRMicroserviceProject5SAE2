import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styles: [`
    :host ::ng-deep .p-multiselect {
        min-width: 15rem;
    }

    :host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
        min-width: 20rem;
    }

    :host ::ng-deep .multiselect-custom .p-multiselect-label {
        padding-top: .25rem;
        padding-bottom: .25rem;

    }

    :host ::ng-deep .multiselect-custom .country-item.country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);
    }

    :host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
        width: 17px;
    }

    :host ::ng-deep .multiselect-custom .country-item {
        display: flex;
        align-items: center;
    }

    :host ::ng-deep .multiselect-custom .country-item img.flag {
        width: 18px;
        margin-right: .5rem;
    }

    :host ::ng-deep .multiselect-custom .country-placeholder {
        padding: 0.25rem;
    }

    :host ::ng-deep .p-colorpicker {
        width: 2.5em
    }
`]
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  selectedFile: File | null = null;
postulationForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      skills: ['', Validators.required],
      nbExp: [0, [Validators.required, Validators.min(0)]], // Changed to nbExp to match your HTML
      cvPath: ['', Validators.required], // Change to match the cvPath input in HTML
      motivation: ['', [Validators.required, Validators.maxLength(225)]], // Added motivation field
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Update form control value to reflect the selected file
      this.applicationForm.patchValue({ cvPath: file.name }); // Store file name in cvPath field
      console.log("File selected:", file.name);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const formData = {
        ...this.applicationForm.value,
        cv: this.selectedFile // Include the selected file in the submission
      };
      console.log("Application Data:", formData);
      // You can proceed to send formData to your API or service here
    } else {
      console.error("Form is invalid");
    }
  }
}
