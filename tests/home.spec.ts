import { test } from "@playwright/test";

import { checkButtonsVisibilityAndAriaLabel } from "./assertions/checkAllButtons";
import { checkHeadingsVisibility } from "./assertions/checkAllHeadings";

test("@Home", async ({ page }) => {
  await page.goto("localhost:4200/home");

  // expect(page.getByRole("button", { name: "Portfolio" }).isVisible());
  await checkButtonsVisibilityAndAriaLabel(page);
  await checkHeadingsVisibility(page);
});
