import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionChecker } from '../utils/sessionCheck';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private Router: Router) {}
  setWithExpiry<T>(key: string, response: any, ttl: number): void {
    const now = new Date();
    const expiry = now.getTime() + ttl; // milliseconds
    let value = response.data;
    const item: {
      value: T;
      expiry: number;
    } = {
      value,
      expiry,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the item is expired
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  getuser() {
    let res = this.getWithExpiry('User');
    let user = res.payload;
    return user;
  }

  logOut() {
    localStorage.removeItem('User');
  }
}
