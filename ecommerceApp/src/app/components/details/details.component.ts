import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Iproduct } from '../../models/iproduct';
import { APiProductsService } from '../../services/api-products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink, TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  currentProductId: number = 0;
  product: Iproduct | null = null;
  productIds: number[] = [];
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiProductsService: APiProductsService,
    private cartService: CartService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Fetch all product IDs from the real API for dynamic Next/Previous navigation
    this.apiProductsService.getAllproducts().subscribe({
      next: (products) => {
        this.productIds = products.map((p) => p.id);
      },
      error: (err) => console.log('Error fetching product IDs:', err),
    });

    // 2. React to URL route changes
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currentProductId = Number(paramMap.get('id'));
      this.quantity = 1;

      this.apiProductsService.getproductById(this.currentProductId).subscribe({
        next: (res) => {
          this.product = res;
        },
        error: (err) => console.log('Error loading product details:', err),
      });
    });
  }

  addToCart(): void {
    if (!this.product || this.product.quantity < this.quantity) return;

    this.product.quantity -= this.quantity;
    this.cartService.addToCart(this.product, this.quantity);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Added ${this.quantity}x ${this.product.name} to Cart`,
      showConfirmButton: false,
      timer: 1500,
    });

    this.quantity = 1;
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(): void {
    this.location.back();
  }

  goNext(): void {
    const currentIdx = this.productIds.indexOf(this.currentProductId);
    if (currentIdx !== -1 && currentIdx < this.productIds.length - 1) {
      this.router.navigate(['/Details', this.productIds[currentIdx + 1]]);
    }
  }

  goPrevious(): void {
    const currentIdx = this.productIds.indexOf(this.currentProductId);
    if (currentIdx > 0) {
      this.router.navigate(['/Details', this.productIds[currentIdx - 1]]);
    }
  }

  get hasPrevious(): boolean {
    return this.productIds.indexOf(this.currentProductId) > 0;
  }

  get hasNext(): boolean {
    const idx = this.productIds.indexOf(this.currentProductId);
    return idx !== -1 && idx < this.productIds.length - 1;
  }
}
