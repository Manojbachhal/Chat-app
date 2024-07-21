import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatboxComponent } from './chatbox/chatbox.component';
import axios from 'axios';
import { LocalStorageService } from '../services/localStorage-service';
import { ChatsService } from './chats.service';
import { SocketService } from '../socketGateway/socket.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  standalone: true,
  imports: [NgFor, CommonModule, ChatboxComponent],
})
export class ChatsComponent implements OnInit {
  constructor(
    private LocalStorage: LocalStorageService,
    private chatService: ChatsService,
    private readonly SocketService: SocketService
  ) // private _toastService: ToastService
  {}
  addInfoToast() {
    // this._toastService.info('message');
  }
  chatBoxVisibility: boolean = false;
  loggedinUser: any;
  value = this.LocalStorage.getWithExpiry('User');
  token = this.value.token;

  setChat(chatData: any) {
    this.chatService.toggleSelectedChat(chatData);
  }

  userData: any = [];
  async ngOnInit() {
    this.SocketService.getChatbox().subscribe((val) => {
      this.chatBoxVisibility = val;
    });

    this.loggedinUser = this.LocalStorage.getuser();

    let value = this.LocalStorage.getWithExpiry('User');
    // console.log();

    let token = value.token;
    try {
      // get chats data
      let response = await axios.get(`${environment.apiUrl}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.userData = response.data;
      console.log(this.userData);

      this.setupRoom();
    } catch (error) {}
  }

  setupRoom() {
    let Userids = this.userData.map((element: any) => {
      return element._id;
    });
    this.SocketService.socketSetup(Userids);
  }

  async startChat(data: any) {
    this.chatService.toggleSelectedChat(data);
  }

  async startChatsm(data: any) {
    this.SocketService.togglechatBox(true);

    this.chatService.toggleSelectedChat(data);
  }
}
