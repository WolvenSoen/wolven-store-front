import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent {
  cartItems: any[] = [];

  constructor() {
    const storedItems = localStorage.getItem('cartItems');
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem._id !== item._id);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  get totalPayment(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addOrSubstractCartItemQuantity(item: any, action: 'add' | 'subtract') {
    const cartItem = this.cartItems.find(cartItem => cartItem._id === item._id);
    if (cartItem) {
      if (action === 'add') {
        cartItem.quantity += 1;
      } else if (action === 'subtract') {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
          this.cartItems = this.cartItems.filter(ci => ci._id !== item._id);
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  checkout() {

  }
}
