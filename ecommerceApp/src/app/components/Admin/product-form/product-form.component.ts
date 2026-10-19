import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Iproduct } from '../../../models/iproduct';
import { Icategory } from '../../../models/icategory';
import { APiProductsService } from '../../../services/api-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  
  productForm!: FormGroup;
  categories: Icategory[] = [];
  currentProductId: number = 0;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _APiproductsservice: APiProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    // 1. Initialize Reactive Form with powerful Validators
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      catId: ['', Validators.required],
      imgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]] // Ensures it's a valid URL
    });
  }

  ngOnInit(): void {
    // Fetch Categories
    this._APiproductsservice.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log('Error fetching categories:', err)
    });

    // Check if Edit or Add Mode
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {
        this.currentProductId = Number(id);
        
        // Fetch product and use patchValue to fill the form automatically!
        this._APiproductsservice.getproductById(this.currentProductId).subscribe({
          next: (data) => {
            this.productForm.patchValue({
              name: data.name,
              price: data.price,
              quantity: data.quantity,
              catId: data.catId,
              imgUrl: data.imgUrl
            });
          },
          error: (err) => console.log('Error fetching product:', err)
        });
      }
    });
  }

  // Easy getter for form controls to use in HTML
  get formControls() {
    return this.productForm.controls;
  }

  goBack(): void {
    this.location.back();
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const productData: Iproduct = this.productForm.value;

    if (this.currentProductId === 0) {
      // Add Product
      this._APiproductsservice.addproduct(productData).subscribe({
        next: () => {
          this.showSuccessAndRedirect('Product Added Successfully!');
        },
        error: (err) => {
          this.isSubmitting = false;
          console.log(err);
        }
      });
    } else {
      // Edit Product
      this._APiproductsservice.updateproduct(this.currentProductId, productData).subscribe({
        next: () => {
          this.showSuccessAndRedirect('Product Updated Successfully!');
        },
        error: (err) => {
          this.isSubmitting = false;
          console.log(err);
        }
      });
    }
  }

  private showSuccessAndRedirect(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/Orders']);
    });
  }
}
