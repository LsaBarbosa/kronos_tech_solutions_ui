/*
 * src/app/core/services/auth.service.ts
 *
 * Serviço de autenticação com persistência de token.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs'; 
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login/login-request.model';
import { LoginResponse } from '../../models/login/login-response.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly apiUrl = '/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'token_expiration';
  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.startTokenExpirationTimer();
  }

  ngOnDestroy(): void {
    this.stopTokenExpirationTimer();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.startTokenExpirationTimer();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    this.stopTokenExpirationTimer();
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toISOString());
  }

  getToken(): string | null {
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) {
      return true;
    }
    const expirationDate = new Date(expiration);
    const now = new Date();
    return expirationDate.getTime() < now.getTime();
  }

  private startTokenExpirationTimer(): void {
    this.stopTokenExpirationTimer(); // Garante que não há timers duplicados
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (expiration) {
      const expirationDate = new Date(expiration);
      const now = new Date();
      const timeLeft = expirationDate.getTime() - now.getTime();
      
      if (timeLeft > 0) {
        this.expirationTimer = setTimeout(() => {
          this.logout();
        }, timeLeft);
      } else {
        this.logout();
      }
    }
  }

  private stopTokenExpirationTimer(): void {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }
}