import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.totalPrice$.subscribe(total => {
      this.totalPrice = total;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    if (this.cartItems.length === 0) return;

    Swal.fire({
      title: 'Order Confirmed!',
      text: 'Thank you for your purchase. Your order has been placed successfully.',
      icon: 'success',
      confirmButtonText: 'Continue Shopping'
    }).then(() => {
      this.cartService.clearCart();
    });
  }
}
