import { style } from '@angular/animations';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlighcard]',
  standalone: true
})
export class HighlighcardDirective {

  constructor(ele:ElementRef){

    ele.nativeElement.style.backgroundColor = 'rgba(var(--bs-success-rgb), var(--bs-bg-opacity))'
  }


   }

