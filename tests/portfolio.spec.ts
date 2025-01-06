import test from "@playwright/test";

import { checkButtonsVisibilityAndAriaLabel } from "./assertions/checkAllButtons";
import { checkHeadingsVisibility } from "./assertions/checkAllHeadings";
import { checkImagesVisibility } from "./assertions/checkAllImages";

test("Portfolio", async ({ page }) => {
  await page.goto("localhost:4200/portfolio");

  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
  await checkImagesVisibility(page);
});
