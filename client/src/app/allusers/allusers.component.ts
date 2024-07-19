import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage-service';
import { RoutesService } from '../routes/routes.service';
import { NgFor } from '@angular/common';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class AllusersComponent implements OnInit {
  constructor(
    private LocalStorage: LocalStorageService,
    private RoutesService: RoutesService
  ) {}
  currentUser = this.LocalStorage.getWithExpiry('User');

  userData: any = ['test'];
  async ngOnInit() {
    // console.log();//
    try {
      let value = this.LocalStorage.getWithExpiry('User');
      let token = value.token;
      let response = await axios.get(`${environment.apiUrl}/users/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.userData = response.data;
    } catch (error) {}
  }
  isLoading: boolean = false;

  async addContact(contactId: string) {
    let value = this.LocalStorage.getWithExpiry('User');
    let token = value.token;
    this.isLoading = true;
    let response = await axios.post(
      `${environment.apiUrl}/contacts`,
      {
        userId: this.currentUser.payload._id,
        contactId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status) {
      this.RoutesService.toggleActiveLink('contact');
    }

    // this.isLoading = false;
    console.log(response);
  }
}
