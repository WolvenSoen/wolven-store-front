import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  providers: [MessageService]
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  products: Product[] = [];

  showDialog = false;
  selectedProduct: Product | null = null;

  constructor(private productsService: ProductsService, private messageService: MessageService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (products: any) => {
        this.products = products;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  // Add to cart functionality (local storage)
  addToCart(product: Product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item: Product) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${product.name} added to cart` });
  }
}
