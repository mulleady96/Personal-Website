import { Functions } from '@angular/fire/functions';
import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";

import { paymentSuccessGuard } from "./payment-success.guard";

describe("paymentSuccessGuard", () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      paymentSuccessGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],});
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });
});
