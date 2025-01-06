import { Locator, Page } from "@playwright/test";

export async function checkHeadingsVisibility(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
  const headings: Locator = page.getByRole("heading");

  // Get the total count of headers [h1, h2, h3, h4, h5, h6] on the page
  const headingCount = await headings.count();
  console.log(`Found ${headingCount} headings(s) on the page.`);

  for (let i = 0; i < headingCount; i++) {
    const header = headings.nth(i);

    const isVisible = await header.isVisible();
    if (!isVisible) {
      throw new Error(`Heading at index ${i} is not visible.`);
    }
  }

  console.log(`All ${headingCount} headings are visible.`);
}
