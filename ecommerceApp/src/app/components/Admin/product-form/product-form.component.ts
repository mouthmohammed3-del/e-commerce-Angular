import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🌟 ضروري جداً لعمل [(ngModel)]
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../../models/iproduct';
import { Icategory } from '../../../models/icategory';
import { APiProductsService } from '../../../services/api-products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  // 🌟 يجب وضع FormsModule هنا لكي يعمل الفورم
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  // 1. كائن المنتج الذي سيتم ربطه بالفورم (يبدأ ككائن فارغ)
  product: Iproduct = {} as Iproduct;

  // 2. مصفوفة الأقسام لملء قائمة الاختيار (Dropdown)
  categories: Icategory[] = [];

  // 3. متغير لمعرفة حالة الصفحة: إضافة (0) أو تعديل (رقم المنتج)
  currentProductId: number = 0;

  constructor(
    private _APiproductsservice: APiProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute // لقراءة الـ ID من الرابط
  ) {}

  ngOnInit(): void {
    // 1. جلب الأقسام من السيرفر (تأكد أن لديك دالة getAllCategories في الخدمة)
    this._APiproductsservice.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.log('Error fetching categories:', err)
    });

    // 2. قراءة الرابط لمعرفة هل يوجد ID؟
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {
        // نحن في وضع التعديل (Edit)
        this.currentProductId = Number(id);

        // جلب بيانات المنتج المراد تعديله لملء الفورم
        this._APiproductsservice.getproductById(this.currentProductId).subscribe({
          next: (data) => {
            this.product = data;
          },
          error: (err) => console.log('Error fetching product:', err)
        });
      } else {
        // نحن في وضع الإضافة (Add)، لا نفعل شيئاً ونترك الكائن فارغاً
        this.currentProductId = 0;
      }
    });
  }

  // 3. دالة الحفظ (تعمل عند الضغط على زر Submit في الفورم)
  saveProduct() {
    if (this.currentProductId === 0) {
      // تنفيذ دالة الإضافة (POST)
      this._APiproductsservice.addproduct(this.product).subscribe({
        next: (res) => {
          alert('Product Added Successfully!');
          // إعادة توجيه المستخدم لصفحة المنتجات بعد النجاح
          this.router.navigate(['/Orders']);
        },
        error: (err) => console.log('Error adding product:', err)
      });
    } else {
      // تنفيذ دالة التعديل (PUT)
      this._APiproductsservice.updateproduct(this.currentProductId, this.product).subscribe({
        next: (res) => {
          alert('Product Updated Successfully!');
          this.router.navigate(['/Orders']);
        },
        error: (err) => console.log('Error updating product:', err)
      });
    }
  }
}

