import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appTypingAnimation]",
})
export class TypingAnimationDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const text = this.el.nativeElement.textContent;

    this.el.nativeElement.textContent = "";

    let i = 0;
    const interval = setInterval(() => {
      this.renderer.setProperty(
        this.el.nativeElement,
        "textContent",
        text.substring(0, i + 1)
      );
      i++;
      if (i === text.length) {
        clearInterval(interval);
      }
    }, 100);
  }
}
