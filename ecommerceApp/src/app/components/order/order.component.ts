import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../services/cart.service';
import { APiProductsService } from '../../services/api-products.service';
import { Icategory } from '../../models/icategory';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsComponent, CurrencyPipe, TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  categories: Icategory[] = [];
  selectedCatId: number = 0;
  selectedSort: string = 'default';
  searchTerm: string = '';
  searchSubject = new Subject<string>();

  constructor(
    private cartService: CartService,
    private apiProductsService: APiProductsService
  ) {
    // Default fallback categories
    this.categories = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Smartphones' },
      { id: 3, name: 'Tablets' },
      { id: 4, name: 'Accessories' },
      { id: 5, name: 'Televisions' }
    ];
  }

  ngOnInit(): void {
    // Fetch live categories from API if available
    this.apiProductsService.getAllCategories().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.categories = data;
        }
      },
      error: (err) => console.log('Using fallback categories:', err)
    });

    // Reactive debounce on search input (300ms)
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
      });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  resetFilters(): void {
    this.selectedCatId = 0;
    this.selectedSort = 'default';
    this.searchTerm = '';
    this.searchSubject.next('');
  }

  get hasActiveFilters(): boolean {
    return this.selectedCatId !== 0 || this.searchTerm.trim() !== '' || this.selectedSort !== 'default';
  }
}
