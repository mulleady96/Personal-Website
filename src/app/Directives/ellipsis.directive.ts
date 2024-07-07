// ellipsis.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[appEllipsis]",
})
export class EllipsisDirective implements OnChanges {
  @Input() maxLength: number = 50;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxLength) {
      this.applyEllipsis();
    }
  }

  private applyEllipsis() {
    const text = this.elementRef.nativeElement.textContent.trim();
    if (text.length > this.maxLength) {
      const truncatedText = text.substring(0, this.maxLength) + "...";
      this.elementRef.nativeElement.textContent = truncatedText;
    }
  }
}
