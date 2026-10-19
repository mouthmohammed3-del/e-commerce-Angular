import { Component, EventEmitter, Input, input, NgModule, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Icategory } from '../../models/icategory';
import { HighlighcardDirective } from '../../Directives/highlighcard.directive';
import { SquarePipe } from '../../pipes/square.pipe';
import { OrderComponent } from '../order/order.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { APiProductsService } from '../../services/api-products.service';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    HighlighcardDirective,
    DatePipe,
    SquarePipe,RouterLink,RouterOutlet,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'

})
export class ProductsComponent implements OnChanges,OnInit {
  // filteredProducts: Iproduct[] = [];
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  totalPrice: number = 0;
  num: number = 4;
  myData: Date = new Date();

  @Input() recievedCatId: number = 0;
  @Input() searchTerm: string = '';
  @Input() sortBy: string = 'default';

  constructor(
    private _APiproductsservice: APiProductsService,
    private router: Router,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this._APiproductsservice.getAllproducts().subscribe({
      next: (res) => {
        this.products = res;
        this.applyFiltersAndSort();
      },
      error: (err) => console.log(err)
    });
  }

  ngOnChanges(): void {
    if (this.products && this.products.length > 0) {
      this.applyFiltersAndSort();
    }
  }

  applyFiltersAndSort(): void {
    let result = [...this.products];

    // 1. Filter by category
    const currentCategoryId = Number(this.recievedCatId);
    if (currentCategoryId > 0) {
      result = result.filter(p => p.catId === currentCategoryId);
    }

    // 2. Filter by search query
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p => p.name.toLowerCase().includes(term));
    }

    // 3. Apply sorting
    switch (this.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    this.filteredProducts = result;
  }
  // دالة الحذف
  // دالة الحذف باستخدام SweetAlert2
  deleteProduct(id: number) {
    // 1. إظهار نافذة التأكيد الأنيقة
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // لون زر الحذف (أحمر)
      cancelButtonColor: '#3085d6', // لون زر الإلغاء (أزرق)
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      // 2. إذا ضغط المستخدم على "نعم، احذف"
      if (result.isConfirmed) {

        // إرسال طلب الحذف للسيرفر
        this._APiproductsservice.deleteproduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(product => product.id !== id);
            this.applyFiltersAndSort();
            this._APiproductsservice.updateProductsCount(this.products.length);
            Swal.fire(
              'Deleted!',
              'The product has been deleted.',
              'success'
            );
          },
          error: (err) => {
            console.error("Error deleting product:", err);
            // إظهار رسالة خطأ إذا فشل السيرفر
            Swal.fire(
              'Error!',
              'Failed to delete the product. Please try again.',
              'error'
            );
          }
        });
      }
    });
  }
  /////////filtter///////////
//
//      filterProducts(){
//   //
// //   //       // Convert the selected ID to a number (HTML select sometimes turns it into a string)
//           //  let categoryId = Number(this.recievedCatId);
// //   //
// //   //       // If 0 ("All Categories") is selected, return the whole original array
//           if ( this.recievedCatId==0) {
//            this.filteredProducts = this.products;
//          }else{
//           this.filteredProducts=this.products.filter((product) => product.catId == this.recievedCatId);
//
//          }

//
//         // Otherwise, use JavaScript's built-in .filter() to return only matches

        // product.catId === categoryId: It asks a true/false question: "Does this product's category ID match the one the user selected?"
  ///////////////////////////
//  }
  buy(product: Iproduct) {
    let count = product.purchaseQuantity ?? 1;

    if (count > 0 && product.quantity >= count) {
      // 1. Deduct the stock locally for UI
      product.quantity -= count;

      // 2. Add to global Cart Service
      this.cartService.addToCart(product, count);

      // 3. Show success alert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Added ${count}x ${product.name} to Cart`,
        showConfirmButton: false,
        timer: 1500
      });

      // Reset the input back to 1
      product.purchaseQuantity = 1;
    } else {
      Swal.fire('Error', 'Invalid quantity or not enough stock!', 'error');
    }
  }

   navigateToDetails(id: number) {

    // Navigate to the details page
    // this.router.navigateByUrl('/Details');
    this.router.navigate(['/Details', id]);

  }



 }

