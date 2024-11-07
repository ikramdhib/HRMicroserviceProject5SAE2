import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DynamicDialogConfig,ConfirmationService,MessageService]


})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  user: any; // Declare user without initialization
  submit = false;
  userId: any;
  isEditing = false; // Flag to toggle edit mode

  constructor(private messageService: MessageService,private fb: FormBuilder, private userServ: UserService) {}

  getUserById(id: any) {
    this.userServ.getUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;

        // Patch the form after user data is retrieved
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone,
          cin: this.user.cin
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get form() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cin: ['', Validators.required],
    });
    
    // Check if 'id' is stored in localStorage
    if (localStorage.hasOwnProperty('id')) {
      this.userId = localStorage.getItem('id');
      console.log('user id', this.userId);
      this.getUserById(this.userId); // Fetch user data by ID
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updateProfile(): void {
    this.submit = true; // Mark the form as submitted

    if (this.userForm.valid) {
      // Prepare user data to update
      const updatedUser = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        cin: this.userForm.value.cin
      };

      // Call the updateUser method from UserService
      this.userServ.updateUser(updatedUser, this.userId).subscribe({
        next: (res) => {
          console.log('User updated successfully:', res);
          this.isEditing = false; // Reset edit mode after successful update
          this.submit = false; // Reset the submit flag if the update is successful
          this.user = res; // Update the local user object with the new data
          this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'les informations personels sont modifier' });

        },
        error: (err) => {
          console.error('Error updating user:', err);
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

        }
      });
    }
  }
}
