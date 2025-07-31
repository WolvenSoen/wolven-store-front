import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        this.router.navigate(['/home']);
        localStorage.setItem('userData', JSON.stringify(response));
      },
      error: (error) => {
        // Handle login error
        this.errorMessage = 'Invalid email or password';
        this.isLoading = false;
        console.error('Login error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
