import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage-service';
import { RoutesService } from '../routes/routes.service';
import { NgFor } from '@angular/common';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

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
    private RoutesService: RoutesService,
    private readonly toastService: ToastrService
  ) {}
  currentUser = this.LocalStorage.getWithExpiry('User');
  showSuccessToast(message: string) {
    this.toastService.success(`${message}`, '', {
      toastClass: 'ngx-toastr bg-green-400 text-white', // Add Tailwind classes here
      closeButton: true,
      enableHtml: true,
      tapToDismiss: true,
      timeOut: 3000,
      progressBar: true,
    });
  }
  userData: any = [];
  async ngOnInit() {
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
      this.showSuccessToast('Contact added successfully');
      this.RoutesService.toggleActiveLink('contact');
    }

    // this.isLoading = false;
    console.log(response);
  }
}
