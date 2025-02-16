// import { test, expect } from "@playwright/test";

import { test } from "@playwright/test";
import {
  checkButtonsVisibilityAndAriaLabel,
  checkHeadingsVisibility,
} from "playwright-broad-utils";

test("Enquire", async ({ page }) => {
  await page.goto("localhost:4200/enquire");

  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
});
