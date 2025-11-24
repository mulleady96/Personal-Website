import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({ selector: '[appInvisible]' })
export class InvisibleDirective {
  
  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) {
      this.renderer.addClass(this.elementRef.nativeElement, 'invisible'); // set base css class for the directive
     }

    @HostListener('mouseenter') onMouseEnter() {
      this.renderer.addClass(this.elementRef.nativeElement, 'invisible:hover');
    }
}
