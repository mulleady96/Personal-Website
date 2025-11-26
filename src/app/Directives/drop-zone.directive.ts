import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[appDropZone]",
    standalone: false
})
export class DropZoneDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() {}

  @HostListener("drop", ["$event"])
  ondrop($event: DragEvent) {
    $event.preventDefault(); // Prevent browser opening new tab.
    if ($event.dataTransfer && $event.dataTransfer.files) {
      this.dropped.emit($event.dataTransfer.files);
    }
    this.hovered.emit(false);
  }

  @HostListener("dragover", ["$event"])
  ondragover($event: { preventDefault: () => void }) {
    $event.preventDefault(); // Prevent browser opening new tab.
    this.hovered.emit(true);
  }

  @HostListener("dragleave", ["$event"])
  ondragleave($event: { preventDefault: () => void }) {
    $event.preventDefault(); // Prevent browser opening new tab.
    this.hovered.emit(false);
  }
}
