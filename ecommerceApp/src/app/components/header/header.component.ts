import { Component } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers:[StaticProductsService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
   *
   */
  constructor(private _serviceProdictsService:StaticProductsService ) {
    


  }

}
