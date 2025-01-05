// import { test, expect } from "@playwright/test";

import test from "@playwright/test";

import { checkButtonsVisibilityAndAriaLabel } from "./assertions/checkAllButtons";
import { checkHeadingsVisibility } from "./assertions/checkAllHeadings";

test("Enquire", async ({ page }) => {
  await page.goto("localhost:4200/enquire");

  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
});
