import { Injectable } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}
/*
init(){
  return     this.keycloakService.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'HR-realm',
        clientId: 'angular-client',
      },
      enableBearerInterceptor: true,
      initOptions: {
        onLoad: 'login-required', // Force login on load
        checkLoginIframe: false, 
      },
    }).catch((error) => {
      console.error('Keycloak init failed', error);
      return Promise.reject(error); // Handle the error appropriately
    });
}

logout() {
  return this.keycloakService.logout();
}

getUsername() {
  return this.keycloakService.getUsername();
}

isAuthenticated(): any {
  return this.keycloakService.isLoggedIn();
}*/
}
