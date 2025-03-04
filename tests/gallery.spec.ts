import { test } from "@playwright/test";
import {
  checkButtonsVisibilityAndAriaLabel,
  checkHeadingsVisibility,
  checkImagesVisibility,
} from "playwright-broad-utils";

test("Gallery", async ({ page }) => {
  await page.goto("localhost:4200/gallery");

  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
  await checkImagesVisibility(page);
});
