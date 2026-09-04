import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StaticProductsService } from '../../services/static-products.service';
import { Iproduct } from '../../models/iproduct';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],

  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  CurrentproductId: number = 0;
  product: Iproduct | null = null;
  productIds: number[];
  currentIdIndex:number=0
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _staticProductsService: StaticProductsService,
    private _location: Location,
    private _router: Router,
  ) {
    this.productIds = this._staticProductsService.mapProductsToIds();
  }

  ngOnInit(): void {
    // 1. Get the product id from the URL.
    // let productId = this._activatedRoute.snapshot.paramMap.get("id");
    // console.log(productId);
    //     this.CurrentproductId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    //
    //    this.product = this._staticProductsService.getproductById(this.CurrentproductId);

    this._activatedRoute.paramMap.subscribe((paramMap)=>{
     this.CurrentproductId =Number( paramMap.get('id'))
     this.product = this._staticProductsService.getproductById(this.CurrentproductId);
    })

  }

  goBack() {
    this._location.back();
  }

  goNext(): void {
    // const productIds =
    //   this._staticProductsService.mapProductsToIds();

    const currentIdIndex = this.productIds.findIndex(
      (id) => id === this.CurrentproductId,
    );

    //productIds = [1, 2, 3, 4];
    //If the current index is already 3, there is no next product.
    if (currentIdIndex < this.productIds.length - 1) {
      this._router.navigateByUrl(
        `/Details/${this.productIds[currentIdIndex + 1]}`,
      );
    }
  }
  goPrevious() {
    this.currentIdIndex = this.productIds.findIndex(
      (id) => id === this.CurrentproductId,
    );
    if (this.currentIdIndex > 0) {
      this._router.navigateByUrl(
        `/Details/${this.productIds[this.currentIdIndex - 1]}`,
      );
    }
  }
}

// وLocation هي خدمة جاهزة من Angular تساعدنا في التعامل مع تاريخ التنقل بين الصفحات.
// ActivatedRoute = "أعطني معلومات عن الصفحة التي أنا فيها الآن" (قراءة).
// Router = "خذني لصفحة أخرى" (تنفيذ/تنقل).
