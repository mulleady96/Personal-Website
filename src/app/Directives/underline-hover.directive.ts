import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUnderlineHover]'
})
export class UnderlineHoverDirective {

  @Input('appUnderlineHover') highlightColor: string;
  
  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) {
      this.renderer.addClass(this.elementRef.nativeElement, 'underline'); // set base css class for the directive
     }

    @HostListener('mouseenter') onMouseEnter() {
     // this.highlight(this.highlightColor || 'lightcoral');
      this.renderer.addClass(this.elementRef.nativeElement, 'underline:after');
    }

    @HostListener('mouseleave') onMouseLeave() {
      // this.highlight(null);
      this.renderer.addClass(this.elementRef.nativeElement, 'underline:hover');
    }

    private highlight(color: string) {
      // this.elementRef.nativeElement.style.background = color;
    }
}
