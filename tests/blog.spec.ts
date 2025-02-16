import { test } from "@playwright/test";
import {
  checkAllExternalLinks,
  checkButtonsVisibilityAndAriaLabel,
  checkHeadingsVisibility,
  checkImagesVisibility,
} from "playwright-broad-utils";

test("@Blog", async ({ page }) => {
  await page.goto("localhost:4200/blog");
  await page.waitForLoadState("domcontentloaded");

  await checkAllExternalLinks(page);
  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
  await checkImagesVisibility(page);
});
