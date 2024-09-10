import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../services/localStorage-service';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';
import { SocketService } from '../socketGateway/socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private loggedinusers = this.LocalStorage.getWithExpiry('User');
  private selectedChatSubject = new BehaviorSubject<any>({});
  private chatNotificationSubject = new BehaviorSubject<any>([]);
  private chatsSubject = new BehaviorSubject<any>([]);

  selectedChat$ = this.selectedChatSubject.asObservable();
  chatnotification$ = this.chatNotificationSubject.asObservable();
  chats$ = this.chatsSubject.asObservable();

  constructor(
    private readonly LocalStorage: LocalStorageService,
    private readonly socketService: SocketService
  ) {
    if (this.loggedinusers && this.loggedinusers.token) {
      this.getChatsData(this.loggedinusers.token);
    }
  }

  async getChatsData(token: string) {
    try {
      let response = await axios.get(`${environment.apiUrl}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.chatsSubject.next(response.data);
      // this.setChatNotification('null');
      this.setupRoom(response.data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  }

  setChatNotification(id: any) {
    let chatsData = this.chatsSubject.getValue();
    chatsData = chatsData.map((chat: any) => {
      chat.notification = chat._id == id; // Set notification flag based on ID match
      return chat;
    });
    this.chatsSubject.next(chatsData);
  }

  getChats() {
    return this.chats$;
  }

  toggleChat(data: any) {
    this.chatsSubject.next([...data]);
  }

  toggleSelectedChat(data: any) {
    this.selectedChatSubject.next(Object.assign({}, data));
  }

  setupRoom(userData: any) {
    let Userids = userData.map((element: any) => element._id);
    this.socketService.socketSetup(Userids);
  }
}
