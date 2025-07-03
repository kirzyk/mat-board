import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public login(email: string, password: string): boolean {
    if (email && password) {
      localStorage.setItem('mock_token', 'abc123');
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('mock_token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('mock_token');
  }
}
