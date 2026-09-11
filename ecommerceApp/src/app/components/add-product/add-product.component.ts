import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';
import { APiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  categories: Icategory[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home & Kitchen' }
  ];

  newproduct: Iproduct = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    imgUrl: '',
    catId: 1,
    purchaseQuantity: 0
  };

  constructor(
    private _APiproductsservice: APiProductsService
  ) {}

  addnewproduct() {

    this._APiproductsservice.addproduct(this.newproduct).subscribe({

      next: (res) => {

        console.log('Product added:', res);

        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Reset form data
        this.newproduct = {
          id: 0,
          name: '',
          price: 0,
          quantity: 0,
          imgUrl: '',
          catId: 1,
          purchaseQuantity: 0
        };

      },

      error: (err) => {

        console.log('Error:', err);

        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while adding the product.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }

    });

  }
  selectedFile: File | null = null;

// onFileSelected(event: Event) {
//
//   const input = event.target as HTMLInputElement;
//
//   if (input.files && input.files.length > 0) {
//
//     this.selectedFile = input.files[0];
//
//     console.log(this.selectedFile);
//   }
// }
}
