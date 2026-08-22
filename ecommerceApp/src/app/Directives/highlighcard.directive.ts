  // import { style } from '@angular/animations';
  import { Directive, ElementRef, HostListener, Input, input, OnChanges, SimpleChanges } from '@angular/core';
  @Directive({
    selector: '[appHighlighcard]',
    standalone: true
  })
  export class HighlighcardDirective implements OnChanges {

  @Input() externalcolors:string='red';

    constructor( private ele :ElementRef){

    //  this.ele.nativeElement.style.backgroundColor = 'rgba(var(--bs-success-rgb), var(--bs-bg-opacity))';
      // this.ele.nativeElement.style.backgroundColor = "red";

    }
    ngOnChanges(changes: SimpleChanges): void {
      this.ele.nativeElement.style.backgroundColor = 'rgba(var(--bs-success-rgb), var(--bs-bg-opacity))';

    }

    @HostListener('mouseover') over() {
      // this.ele.nativeElement.style.backgroundColor = this.externalcolors;
      this.ele.nativeElement.style.backgroundColor = "green";
  }

  @HostListener('mouseout') out() {
      this.ele.nativeElement.style.backgroundColor = "white";
  }
  }


