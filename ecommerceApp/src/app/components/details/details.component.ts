import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { StaticProductsService } from '../../services/static-products.service';
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  CurrentproductId:number=0;
  product:Iproduct|null=null;
   constructor(private _activatedRoute: ActivatedRoute,
   private _staticProductsService:StaticProductsService)
  {


  }
  ngOnInit(): void {
    // 1. Get the product id from the URL.
    // let productId = this._activatedRoute.snapshot.paramMap.get("id");
    // console.log(productId);
    this.CurrentproductId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this._staticProductsService.getproductById(this.CurrentproductId);




  }


}

// ActivatedRoute = "أعطني معلومات عن الصفحة التي أنا فيها الآن" (قراءة).
// Router = "خذني لصفحة أخرى" (تنفيذ/تنقل).
