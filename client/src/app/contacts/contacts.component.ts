import { Component } from '@angular/core';
import axios from 'axios';
import { LocalStorageService } from '../services/localStorage-service';
import { User } from '../models/user-model';
import { Contact } from '../interfaces/interfaces';
import { NgFor, NgIf } from '@angular/common';
import { ChatsService } from '../chats/chats.service';
import { RoutesService } from '../routes/routes.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [NgFor, NgIf],
})
export class ContactsComponent {
  constructor(
    private LocalStorage: LocalStorageService,
    private readonly chatService: ChatsService,
    private readonly RoutesService: RoutesService
  ) {}
  ContactData: Contact[] = [];
  value = this.LocalStorage.getWithExpiry('User');
  token = this.value.token;
  currentUser = this.value.payload;

  // getting contacts data
  async ngOnInit() {
    let response = await axios.get('http://localhost:3000/contacts', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    this.ContactData = response.data;
  }

  toggleNav() {
    this.RoutesService.toggleActiveLink('Home');
  }

  // create a chat between user and contact
  async startChat(contactId: any) {
    let bodyContent = {
      contactId,
    };

    let res = await axios.post(`${environment.apiUrl}/chat`, bodyContent, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    setTimeout(() => {
      this.toggleNav();
    }, 300);
  }
}
