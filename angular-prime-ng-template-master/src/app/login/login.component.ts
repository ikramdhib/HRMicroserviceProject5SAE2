import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { AuthService } from '../config/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  valCheck: string[] = ['remember'];

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Enregistrez le token dans le localStorage
        localStorage.setItem('accessToken', response.accessToken.access_token);
        localStorage.setItem('id', response.id); // Exemple: vous pouvez utiliser une autre propriété pour l'ID de l'utilisateur
        localStorage.setItem('userRole', response.role); // Ajustez selon vos besoins

        // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
        this.router.navigate(['/user/dashboard']);
      },
    );
  }

}
