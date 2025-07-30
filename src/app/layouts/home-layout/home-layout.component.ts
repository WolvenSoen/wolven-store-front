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
  currentYear = new Date().getFullYear();
  products: Product[] = [];

  showDialog = false;
  selectedProduct: Product | null = null;

  constructor(private productsService: ProductsService) {}

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

  openProductDialog(product: Product) {
    this.selectedProduct = product;
    this.showDialog = true;
  }

  closeProductDialog() {
    this.showDialog = false;
    this.selectedProduct = null;
  }
}
