import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../models/iproduct';

export interface CartItem {
  product: Iproduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Global State for the Cart
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPrice.asObservable();

  constructor() {}

  // Add an item to the cart
  addToCart(product: Iproduct, quantity: number) {
    const currentCart = this.cartItems.getValue();

    // Check if product is already in the cart
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cartItems.next([...currentCart]);
    this.calculateTotal();
  }

  // Remove an item from the cart
  removeFromCart(productId: number) {
    const currentCart = this.cartItems.getValue();
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedCart);
    this.calculateTotal();
  }

  // Clear the entire cart
  clearCart() {
    this.cartItems.next([]);
    this.totalPrice.next(0);
  }

  // Calculate the total price of all items in the cart
  private calculateTotal() {
    const currentCart = this.cartItems.getValue();
    const total = currentCart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    this.totalPrice.next(total);
  }
}
