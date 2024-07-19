import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private selectedChatSubject = new BehaviorSubject<any>({});

  selectedChat$ = this.selectedChatSubject.asObservable();

  constructor() {}

  toggleSelectedChat(data: any) {
    this.selectedChatSubject.next(Object.assign({}, data));
  }
}
