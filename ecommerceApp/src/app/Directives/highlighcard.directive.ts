import { style } from '@angular/animations';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlighcard]',
  standalone: true
})
export class HighlighcardDirective {

  constructor(ele:ElementRef){

    ele.nativeElement.style.backgroundColor = 'green';
  }


   }

