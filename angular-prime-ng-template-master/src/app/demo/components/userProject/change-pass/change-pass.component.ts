import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  providers: [MessageService]

})
export class ChangePassComponent implements OnInit {

  passwordChangeForm!: FormGroup;
  submit = false;
  userId:any;
  constructor(private messageService: MessageService,private fb: FormBuilder, private userServ: UserService) {}

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });

    if (localStorage.hasOwnProperty('id')) {
      this.userId = localStorage.getItem('id');
      console.log('user id', this.userId);
    }
  }

  changePassword(): void {
    this.submit = true; // Mark the form as submitted

    if (this.passwordChangeForm.valid) {
      const passwordData = {
        userId:this.userId,
        oldPassword: this.passwordChangeForm.value.oldPassword,
        newPassword: this.passwordChangeForm.value.newPassword,
      };

      // Call your user service to change the password
      this.userServ.changePassword(passwordData).subscribe({
        next: (res) => {
          console.log('Password changed successfully:', res);
          this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le mot de passe avec succés' });
         
        },
        error: (err) => {
          console.error('Error changing password:', err);
          this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });
         
        }
      });
    }
  }

}
