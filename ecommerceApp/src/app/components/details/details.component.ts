import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  constructor(private _activatedRoute: ActivatedRoute)
  {

   }


}

// ActivatedRoute = "أعطني معلومات عن الصفحة التي أنا فيها الآن" (قراءة).
// Router = "خذني لصفحة أخرى" (تنفيذ/تنقل).
