import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localStorage-service';

@Injectable({ providedIn: 'root' })
export class SessionChecker {
  private session: boolean = false;

  constructor(private localStorageService: LocalStorageService) {
    this.checkSession(); // Check session on initialization
  }

  private checkSession(): void {
    const token = this.localStorageService.getWithExpiry('User');
    if (token !== null) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  setSession(isLoggedIn: boolean): void {
    this.session = isLoggedIn;
  }

  getSession(): boolean {
    this.checkSession();
    return this.session;
  }
}
