import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';

  baseUrlUserAdmin = `${environment.apiUrlNode}users/current`;

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' &&
           typeof localStorage !== 'undefined';
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    return null;
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isTokenExpired(token: string | null): boolean {

    if (!token) {
      return true;
    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      const expiry = payload.exp;

      if (!expiry) {
        return true;
      }

      const now = Math.floor(Date.now() / 1000);

      return expiry <= now;

    } catch (error) {

      console.error('❌ Token invalide :', error);

      return true;
    }
  }

  isLoggedIn(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  }

  getCurrentUser() {

    const token = this.getToken();

    if (!token) {
      throw new Error('Aucun token trouvé');
    }

    return this.http.get<any>(
      this.baseUrlUserAdmin,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}