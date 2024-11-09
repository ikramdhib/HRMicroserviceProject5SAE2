import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  message = "Votre application a bien été soumise !";

}
