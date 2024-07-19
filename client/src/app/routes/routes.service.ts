import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface ActiveLink {
  Home: boolean;
  group: boolean;
  contact: boolean;
  addContact: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor() {}
  activeLink: BehaviorSubject<ActiveLink> = new BehaviorSubject<ActiveLink>({
    Home: true,
    group: false,
    contact: false,
    addContact: false,
  });

  toggleActiveLink(linkName: string) {
    console.log(linkName, 'routes');
    const newActiveLink: ActiveLink = {
      Home: false,
      group: false,
      contact: false,
      addContact: false,
    };

    if (linkName in newActiveLink) {
      newActiveLink[linkName as keyof ActiveLink] = true;
      this.activeLink.next(newActiveLink);
    }
  }
  getActiveLink(): Observable<ActiveLink> {
    return this.activeLink.asObservable();
  }

  // getActiveLink(): string {
  //   let currentActiveLink: string | undefined;
  //   this.activeLink
  //     .subscribe((activeLink) => {
  //       for (let key in activeLink) {
  //         if (activeLink[key as keyof ActiveLink]) {
  //           currentActiveLink = key;
  //         }
  //       }
  //     })
  //     .unsubscribe();
  //   return currentActiveLink as string;
  // }
}
