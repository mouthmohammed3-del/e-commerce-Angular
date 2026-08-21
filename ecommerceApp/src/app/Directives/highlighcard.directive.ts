  // import { style } from '@angular/animations';
  import { Directive, ElementRef, HostListener, Input, input } from '@angular/core';
  @Directive({
    selector: '[appHighlighcard]',
    standalone: true
  })
  export class HighlighcardDirective {

  @Input() externalcolors:string='red';

    constructor( private ele :ElementRef){

    //  this.ele.nativeElement.style.backgroundColor = 'rgba(var(--bs-success-rgb), var(--bs-bg-opacity))';
      // this.ele.nativeElement.style.backgroundColor = "red";

    }

    @HostListener('mouseenter') over() {
      this.ele.nativeElement.style.backgroundColor = this.externalcolors;
  }

  @HostListener('mouseleave') out() {
      this.ele.nativeElement.style.backgroundColor = "white";
  }
  }


