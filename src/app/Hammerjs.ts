import { Injectable } from "@angular/core";
import { HammerGestureConfig } from "@angular/platform-browser";
import * as Hammer from "hammerjs";

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = {
    // override gestures by setting to false.
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
