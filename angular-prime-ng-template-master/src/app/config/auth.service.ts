import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_RL = environment.API_URL;
  constructor(private http: HttpClient) {}

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_RL}auth/login`, { email, password }).pipe(
      tap((response) => {
        // Store tokens after successful login
        this.storeTokens(response.accessToken.access_token, response.accessToken.refresh_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.tokenSubject.next(null);
    this.refreshTokenSubject.next(null);
  }

  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.tokenSubject.next(accessToken);
    this.refreshTokenSubject.next(refreshToken);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return of(null); // Return empty observable if no refresh token is available
    }
    return this.http.post(`${this.API_RL}auth/refresh`, { refresh_token: refreshToken }).pipe(
      switchMap((response: any) => {
        if (response?.access_token && response?.refresh_token) {
          const newAccessToken = response.access_token;
          const newRefreshToken = response.refresh_token;
          this.storeTokens(newAccessToken, newRefreshToken);
          return of(response); // Return the refreshed token data
        } else {
          throw new Error('Unable to refresh token');
        }
      }),
      catchError((error) => {
        console.error('Refresh token failed', error);
        this.logout(); // Logout the user if refresh fails
        return of(null); // Optionally return null or an error message
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    // Check if token exists and is valid
    return !!this.getToken();
  }

  getUserRoles(): any {
    return localStorage.getItem('userRole');
  }
}
