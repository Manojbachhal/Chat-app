import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { gmailValidator } from '../Validators/gmail-validator';
import axios from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/localStorage-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements AfterViewInit {
  constructor(
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService,
    private Router: Router,
    private readonly toastService: ToastrService
  ) {
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (r) => {
        return r;
      },
      (e) => {
        return Promise.reject(e);
      }
    );
  }

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

  showFailureToast(message: string) {
    this.toastService.error(`${message}`, '', {
      toastClass: 'ngx-toastr bg-red-600 text-white', // Add Tailwind classes here
      closeButton: true,
      enableHtml: true,
      tapToDismiss: true,
      timeOut: 3000,
      progressBar: true,
    });
  }

  @ViewChild('signup') signupButton!: ElementRef;
  @ViewChild('signin') loginButton!: ElementRef;
  @ViewChild('container') userForms!: ElementRef;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      gmailValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      gmailValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngAfterViewInit() {
    // Add event listener to the "Sign Up" button
    this.signupButton.nativeElement.addEventListener('click', () => {
      this.userForms.nativeElement.classList.add('right-panel-active');
    });

    // Add event listener to the "Login" button
    this.loginButton.nativeElement.addEventListener('click', () => {
      this.userForms.nativeElement.classList.remove('right-panel-active');
    });
  }

  async apiCall(endpoint: string, bodyContent: any) {
    let headersList = {
      'Content-Type': 'application/json',
    };
    let reqOptions = {
      url: `http://localhost:3000/users/${endpoint}`,
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };
    let response = await axios.request(reqOptions);
    return response;
  }

  async loginSubmit() {
    if (this.loginForm.valid) {
      try {
        let userData = this.loginForm.value;
        let bodyContent = JSON.stringify(userData);

        let response = await this.apiCall('login', bodyContent);

        // setting response to localStorage and redirecting to dashbord
        this.localStorageService.setWithExpiry('User', response, 86400000);
        this.showSuccessToast('Login successful!');
        this.Router.navigate(['/']);
      } catch (error: any) {
        this.showFailureToast(error.response.data.message);
        // console.log();
      }
      //
    } else {
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  async registerSubmit() {
    if (this.registerForm.valid) {
      let userData = this.registerForm.value;
      let bodyContent = JSON.stringify(userData);

      let response = await this.apiCall('register', bodyContent);

      if (response.data) {
        this.userForms.nativeElement.classList.remove('right-panel-active');
        this.showSuccessToast('Signup successful!');

        this.registerForm.reset();
      }
    }
  }
}
