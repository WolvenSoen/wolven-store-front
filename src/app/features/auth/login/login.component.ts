import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {

  isLoading: boolean = false;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  errorMessage: string | null = null;

  constructor() {

  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      // Mock redirect to home
      window.location.href = '/home';
    }, 1000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
