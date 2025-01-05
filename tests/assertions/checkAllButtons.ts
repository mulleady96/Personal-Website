import { Locator, Page } from "@playwright/test";

export async function checkButtonsVisibilityAndAriaLabel(
  page: Page,
): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
  const buttons: Locator = page.getByRole("button");

  // Get the total count of buttons
  const buttonCount = await buttons.count();
  console.log(`Found ${buttonCount} button(s) on the page.`);

  for (let i = 0; i < buttonCount; i++) {
    const button = buttons.nth(i);

    console.log("button", button);

    const isVisible = await button.isVisible();
    if (!isVisible) {
      throw new Error(`Button at index ${i} is not visible.`);
    }

    const ariaLabel = await button.getAttribute("aria-label");
    if (!ariaLabel) {
      throw new Error(`Button at index ${i} does not have an aria-label.`);
    }
  }

  console.log(`All ${buttonCount} buttons are visible and have an aria-label.`);
}
