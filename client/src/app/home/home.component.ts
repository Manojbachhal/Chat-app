import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { LocalStorageService } from '../services/localStorage-service';
import { Router } from '@angular/router';
import { ChatboxComponent } from '../chats/chatbox/chatbox.component';
import { ChatsComponent } from '../chats/chats.component';
import { AllusersComponent } from '../allusers/allusers.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { RoutesService } from '../routes/routes.service';
import { SocketService } from '../socketGateway/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    ChatboxComponent,
    ChatsComponent,
    AllusersComponent,
    ContactsComponent,
    NgIf,
  ],
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private LocalStorage: LocalStorageService,
    private router: Router,
    private routesService: RoutesService,
    private readonly SocketService: SocketService
  ) {}

  @ViewChild('theme') theme: ElementRef | undefined;
  notification: boolean = false;
  chatBoxVisibility: boolean = false;
  isSidebarOpen = true;
  activeLink = {
    Home: true,
    group: false,
    contact: false,
    addContact: false,
  };
  // userData: any = [];

  toggleActiveLink(linkName: string) {
    this.routesService.toggleActiveLink(linkName);
  }

  // theme changing
  toggleTheme() {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'isLight';

    // console.log(currentTheme, 'currenttheme');
    if (currentTheme == 'isLight') {
      body.classList.toggle('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.toggle('dark');
      localStorage.setItem('theme', 'isLight');
    }
  }

  ngOnInit() {
    this.SocketService.notificaiton().subscribe((noti) => {
      this.notification = noti;
    });

    this.SocketService.getChatbox().subscribe((vis) => {
      this.chatBoxVisibility = vis;
    });

    this.routesService.getActiveLink().subscribe((activeLink) => {
      this.activeLink = activeLink;
    });

    const currentTheme = localStorage.getItem('theme') || 'isLight';
    const body = document.body;
    if (currentTheme !== 'isLight') {
      body.classList.toggle('dark');
    }
  }
  ngAfterViewInit() {
    const currentTheme = localStorage.getItem('theme') || 'isLight';

    // theme icon on load
    if (this.theme && currentTheme == 'isLight') {
      this.theme.nativeElement.checked = false;
    } else if (this.theme && currentTheme == 'dark') {
      this.theme.nativeElement.checked = true;
    }
  }

  async logOut() {
    this.LocalStorage.logOut();
    this.router.navigate(['/auth']);
  }
}
