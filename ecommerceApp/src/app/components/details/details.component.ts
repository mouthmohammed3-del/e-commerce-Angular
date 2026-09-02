import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { StaticProductsService } from '../../services/static-products.service';
import { Iproduct } from '../../models/iproduct';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterOutlet,CurrencyPipe],

  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  CurrentproductId:number=0;
  product:Iproduct|null=null;
   constructor(private _activatedRoute: ActivatedRoute,
   private _staticProductsService:StaticProductsService,
   private _location: Location

  )
  {


  }
  ngOnInit(): void {
    // 1. Get the product id from the URL.
    // let productId = this._activatedRoute.snapshot.paramMap.get("id");
    // console.log(productId);
    this.CurrentproductId = Number(this._activatedRoute.snapshot.paramMap.get("id"));

   this.product = this._staticProductsService.getproductById(this.CurrentproductId);




  }

  goBack(){
  this._location.back();

  }
  goPrevious(){

  }
  goNext(){

  }
}


// وLocation هي خدمة جاهزة من Angular تساعدنا في التعامل مع تاريخ التنقل بين الصفحات.
// ActivatedRoute = "أعطني معلومات عن الصفحة التي أنا فيها الآن" (قراءة).
// Router = "خذني لصفحة أخرى" (تنفيذ/تنقل).
