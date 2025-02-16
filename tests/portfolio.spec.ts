import test from "@playwright/test";
import {
  checkButtonsVisibilityAndAriaLabel,
  checkHeadingsVisibility,
  checkImagesVisibility,
} from "playwright-broad-utils";

test("Portfolio", async ({ page }) => {
  await page.goto("localhost:4200/portfolio");

  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
  await checkImagesVisibility(page);
});
