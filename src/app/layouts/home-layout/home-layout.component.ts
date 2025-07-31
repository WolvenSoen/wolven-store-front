
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent {
  userData: any = null;

  constructor(private router: Router) {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        this.userData = JSON.parse(userDataStr);
        this.userData = this.userData.userData
      } catch {
        this.userData = null;
      }
    }
  }

  get cartCount(): number {
    const cartItems = localStorage.getItem('cartItems');
    if (!cartItems) return 0;
    try {
      // Sum all quantities for a more accurate badge
      return JSON.parse(cartItems).reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    } catch {
      return 0;
    }
  }

  logout() {
    localStorage.removeItem('userData');
    // Optionally clear other sensitive data
    this.router.navigate(['/auth/login']);
  }
}
