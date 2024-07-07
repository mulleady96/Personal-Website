import { Injectable } from "@angular/core";
import * as Hammer from "hammerjs";
import { HammerGestureConfig } from "@angular/platform-browser";

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override gestures by setting to false.
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
