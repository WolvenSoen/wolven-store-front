import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-home-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
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
}
