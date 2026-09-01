import { Component } from '@angular/core';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/index";
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-values',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css'
})
export class ValuesComponent {

}
