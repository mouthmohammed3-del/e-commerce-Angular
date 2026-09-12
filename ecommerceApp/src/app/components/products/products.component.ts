import { Component, EventEmitter, Input, input, NgModule, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Icategory } from '../../models/icategory';
import { HighlighcardDirective } from '../../Directives/highlighcard.directive';
import { SquarePipe } from '../../pipes/square.pipe';
import { OrderComponent } from '../order/order.component';
import { StaticProductsService } from '../../services/static-products.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { APiProductsService } from '../../services/api-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    HighlighcardDirective,
    DatePipe,
    SquarePipe,RouterLink,RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'

})
export class ProductsComponent implements OnChanges,OnInit {
  // filteredProducts: Iproduct[] = [];
  products :  Iproduct[]=[] as Iproduct[];

  filteredProducts!:Iproduct[];
  // selectedCatId: number = 0;
  totalPrice: number=0;
 num : number =4;
 @Input() recievedCatId:number=0
  myData:Date=new Date()
  //define event
@Output() onTotalPriceChanged:EventEmitter<number>
//private _StaticProductsService:StaticProductsService
  constructor(private _APiproductsservice:APiProductsService, private router:Router)
  {

    //  this.products = this._APiproductsservice.getAllproducts()
    // this.products = [
    //   {id:1,name:'Dell laptop 1',price:100,quantity:8,imgUrl:'assets/lee-campbell-GI6L2pkiZgQ-unsplash.jpg',catId:1,purchaseQuantity: 3},
    //   {id:2,name:'Hp laptop',price:200,quantity:50,imgUrl:'assets/lauren-mancke-aOC7TSLb1o8-unsplash.jpg',catId:1,purchaseQuantity: 1},
    //   {id:3,name:'Iphone',price:300,quantity:30,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:3,purchaseQuantity: 1},
    //   {id:4,name:'oppo',price:400,quantity:40,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:4,purchaseQuantity: 1},
    //   {id:5,name:'samsung',price:500,quantity:0,imgUrl:'assets/matt-wojtas-BVPnKddgJ8E-unsplash.jpg',catId:5,purchaseQuantity: 1},
    // ]

    this.filteredProducts = this.products;

    this.onTotalPriceChanged=new EventEmitter<number>()
  }

  ngOnInit(): void {
    this._APiproductsservice.getAllproducts().subscribe({
      next:(res)=>{
        this.products=res
          this.filteredProducts = this.products;

      },


      error:(err)=>{console.log(err)}
    })
  }
  ngOnChanges() {
    // 🌟 السحر هنا: نجبر القيمة القادمة من الأب لتكون رقماً حقيقياً
    let currentCategoryId = Number(this.recievedCatId);

    if (currentCategoryId === 0) {
      // إذا كان 0، نجلب كل المنتجات
      this._APiproductsservice.getAllproducts().subscribe({
        next: (res) => {
          this.products = res;
          this.filteredProducts = res;
        },
        error: (err) => console.log(err)
      });
    } else {
      // إذا كان أي رقم آخر، نجلب منتجات هذا القسم فقط
      this._APiproductsservice.getproductByCatId(currentCategoryId).subscribe({
        next: (res) => {
          this.filteredProducts = res;
        },
        error: (err) => console.log(err)
      });
    }
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
            // تحديث المصفوفة لإخفاء المنتج من الشاشة
            this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);

            // 3. إظهار رسالة نجاح صغيرة وجميلة
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
  buy(product: Iproduct){

        let count = product.purchaseQuantity ?? 1;

  if (count > 0 && product.quantity >= count) {

    // Deduct the stock
    product.quantity -= count;


    // Calculate the price
    this.totalPrice += count  * product.price;

    //2- fire  event
    this.onTotalPriceChanged.emit(this.totalPrice)
    alert(`Bought ${count} of ${product.name} for $${this.totalPrice}`);

    // Reset the input back to 1
    product.purchaseQuantity = 1;

  } else {
    alert('Invalid quantity or not enough stock!');
  }


   }

   navigateToDetails(id: number) {

    // Navigate to the details page
    // this.router.navigateByUrl('/Details');
    this.router.navigate(['/Details', id]);

  }



 }

