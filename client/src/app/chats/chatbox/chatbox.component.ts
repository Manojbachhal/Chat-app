import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatsService } from '../chats.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormsModule, NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/localStorage-service';
import { SocketService } from 'src/app/socketGateway/socket.service';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, NgClass, PickerComponent, FormsModule],
})
export class ChatboxComponent implements OnInit {
  // @ViewChild('typing') typingInput: ElementRef;
  messageValue: string = '';
  userData: any = {};
  isEmoji: boolean = false;
  bar: any;
  loggedInUser: any;
  allMessages: any[] = [];
  typingForm: any;
  chatBoxVisibility: boolean = false;

  constructor(
    private chatService: ChatsService,
    private readonly LocalStorageService: LocalStorageService,
    private readonly SocketService: SocketService
  ) {}
  @ViewChild('chatBox') chatBox!: ElementRef;

  ngOnInit() {
    this.SocketService.getChatbox().subscribe((vis) => {
      this.chatBoxVisibility = vis;
    });

    this.chatService.selectedChat$.subscribe((data) => {
      this.userData = data;
      this.getAllMessages();
      this.SocketService.toggleNotification(false);
      if (this.allMessages.length > 0) this.scrollToBottom();
    });
    this.loggedInUser = this.LocalStorageService.getuser();

    //socket checking on new messages event
    this.SocketService.receiveMessage().subscribe((message) => {
      // console.log('New message received:', message);

      if (this.allMessages[this.allMessages.length - 1]?._id !== message._id) {
        this.allMessages.push(message);
        this.chatService.setChatNotification(message.chat._id);
        this.SocketService.toggleNotification(true);
      }
    });
  }

  async getAllMessages() {
    let id = this.userData._id;
    // console.log(this.userData);
    let token = this.LocalStorageService.getWithExpiry('User').token;
    if (id) {
      let res = await axios.get(`${environment.apiUrl}/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data, 'message data');
      this.chatService.setChatNotification(res.data[0]._id);
      this.allMessages = res.data;
      if (this.allMessages.length > 0) this.scrollToBottom();
    }
  }

  addEmoji(e: any, typingForm: NgForm) {
    let temp = (typingForm.value.Message += e.emoji.native);
    this.messageValue = temp;
    typingForm.value.Message = temp;
  }

  async sendMessage(typingForm: NgForm) {
    let token = this.LocalStorageService.getWithExpiry('User').token;
    this.messageValue = typingForm.value.Message;
    if (this.messageValue.length > 0) {
      // api call for the same
      let res = await axios.post(
        `${environment.apiUrl}/message`,
        {
          chatId: this.userData._id,
          content: this.messageValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.messageValue = '';

      let newMessage = await res.data;
      this.allMessages = [...this.allMessages, res.data];

      // sending msg to socket
      this.SocketService.sendMessage(this.userData._id, newMessage);
      // console.log(this.userData._id);
      this.scrollToBottom();
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      try {
        const element = this.chatBox.nativeElement;
        // console.log(element.scrollHeight);
        let height = element.scrollHeight + 66;
        element.scrollTop = height;
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }, 300);
  }

  toggleChatBox() {
    this.SocketService.togglechatBox(false);
  }
}
