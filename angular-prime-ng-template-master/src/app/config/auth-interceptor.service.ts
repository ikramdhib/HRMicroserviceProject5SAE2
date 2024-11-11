import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  isRefreshing = false; // Indicateur pour savoir si un rafraîchissement est en cours
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();

    // Si un token d'accès existe, on l'ajoute à la requête
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si l'erreur est liée à un token expiré (401 Unauthorized)
        if (error.status === 401 && this.authService.getToken()) {
          // Si le token est en cours de rafraîchissement, on attend la fin du rafraîchissement
          if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
              switchMap(() => next.handle(this.addAuthorizationHeader(request)))
            );
          } else {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              switchMap(() => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(true);
                // Relancer la requête avec le nouveau token
                const newToken = this.authService.getToken();
                request = this.addAuthorizationHeader(request, newToken);
                return next.handle(request); // Re-relancer la requête avec le nouveau token
              }),
              catchError((err) => {
                this.isRefreshing = false;
                this.authService.logout(); // Si le rafraîchissement échoue, déconnecter l'utilisateur
                return of({} as HttpEvent<any>);
              })
            );
          }
        }
        // Gérer les erreurs qui ne sont pas des 401
        return of({} as HttpEvent<any>);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string | null = this.authService.getToken()) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
}
