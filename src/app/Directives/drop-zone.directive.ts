import { Directive, EventEmitter,HostListener, Output } from "@angular/core";

@Directive({
  selector: "[appDropZone]",
})
export class DropZoneDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() {}

  @HostListener("drop", ["$event"])
  ondrop($event: {
    preventDefault: () => void;
    dataTransfer: FileList | undefined;
  }) {
    $event.preventDefault(); // Prevent browser opening new tab.
    this.dropped.emit($event.dataTransfer);
    this.hovered.emit(false);
  }

  @HostListener("dragover", ["$event"])
  ondragover($event: { preventDefault: () => void }) {
    $event.preventDefault(); // Prevent browser opening new tab.
    this.hovered.emit(true);
  }

  @HostListener("dragover", ["$event"])
  ondragleave($event: { preventDefault: () => void }) {
    $event.preventDefault(); // Prevent browser opening new tab.
    this.hovered.emit(false);
  }
}
