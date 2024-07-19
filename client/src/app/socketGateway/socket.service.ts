import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LocalStorageService } from '../services/localStorage-service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private messageSubject: Subject<any> = new Subject<any>();
  notificationSubject: Subject<boolean> = new Subject<boolean>();
  chatBoxSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly LocalStorage: LocalStorageService) {
    let userId = this.LocalStorage.getuser()._id;
    this.socket = io('http://localhost:3000');

    this.socket.emit('activeState', userId);

    //
    this.socket.on('message-received', (newMessage) => {
      this.messageSubject.next(newMessage);
    });
  }
  socketSetup(userIdArray: string[]) {
    userIdArray.forEach((userId) => {
      this.socket.emit('setup', userId);
    });
  }

  // activeState(userId: string) {
  //   this.socket.emit('activeState', userId);
  // }

  toggleNotification(val: boolean) {
    this.notificationSubject.next(val);
  }

  togglechatBox(val: boolean) {
    this.chatBoxSubject.next(val);
  }

  sendMessage(roomId: string, payload: any) {
    this.socket.emit('message', { roomId, payload });
  }

  receiveMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  notificaiton() {
    return this.notificationSubject.asObservable();
  }
  getChatbox() {
    return this.chatBoxSubject.asObservable();
  }
}
