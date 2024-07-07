// copy.directive.ts
import { Directive, ElementRef, HostListener } from "@angular/core";
import * as ClipboardJS from "clipboard";

@Directive({
  selector: "[appCopy]",
})
export class CopyDirective {
  clipboard: ClipboardJS;

  constructor(private el: ElementRef) {}

  @HostListener("click") onClick() {
    const text = this.el.nativeElement.innerHtml;
    this.clipboard = new ClipboardJS(this.el.nativeElement, {
      text: () => text,
    });
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
