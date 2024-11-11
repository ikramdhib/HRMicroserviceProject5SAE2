import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardsService {

  constructor(public authServ : AuthService ,
    public router : Router) { }


    canActivate(route: ActivatedRouteSnapshot): boolean {
      const expectedRoles = route.data['roles']; // Roles required for this route
      const token = this.authServ.getToken(); // Get the JWT token
  
      if (!token) {
        // If there's no token, redirect to login or access denied page
        this.router.navigate(['/login']);
        return false;
      }
  
      let tokenPayload: any = jwtDecode(token); // Decode the JWT token to get the payload
  
      if (this.authServ.isAuthenticated()) {
        // Check if any of the user's roles are in the expectedRoles
        const userRoles = tokenPayload.realm_access.roles;  // Get roles from the decoded token
  
        // Check if the user's roles match the expected roles for this route
        const hasAccess = userRoles.some((role: string) => expectedRoles.includes(role));
  
        if (hasAccess) {
          return true; // Access granted
        }
      }
  
      // If no roles match, redirect to 404 or access denied page
      this.router.navigate(['/pages/notfound']);
      return false;
    }
}
