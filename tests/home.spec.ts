import { test } from "@playwright/test";
import {
  checkAllExternalLinks,
  checkButtonsVisibilityAndAriaLabel,
  checkHeadingsVisibility,
  checkImagesVisibility,
} from "playwright-broad-utils";

test("@Home", async ({ page }) => {
  await page.goto("localhost:4200/home");

  await checkAllExternalLinks(page);
  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
  await checkImagesVisibility(page);
});
