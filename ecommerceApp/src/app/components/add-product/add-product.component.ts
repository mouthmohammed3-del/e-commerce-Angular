import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { APiProductsService } from '../../services/api-products.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  newproduct: Iproduct = {} as Iproduct;
  categories: Icategory[];

  /**
   *
   */
  constructor(
    private _APiProductsService: APiProductsService,
    private _router: Router,
  ) {
    this.categories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
      { id: 3, name: 'Home & Kitchen' },
    ];
  }


  addnewproduct() {
    {
      this._APiProductsService.addproduct(this.newproduct).subscribe({
        next: () => {
            Swal.fire('Success', 'Product added successfully', 'success');
          this._router.navigate(['/Products']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
};
