import { Locator, Page } from "@playwright/test";

export async function checkImagesVisibility(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
  const images: Locator = page.getByRole("img");

  // Get the total count of img elements on the page
  const imageCount = await images.count();
  console.log(`Found ${imageCount} image(s) on the page.`);

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);

    const isVisible = await image.isVisible();
    if (!isVisible) {
      throw new Error(`Image at index ${i} is not visible.`);
    }

    const hasAlt = await image.getAttribute("alt");
    if (!hasAlt) {
      throw new Error(`Image at index ${i} has no alt text.`);
    }
  }

  console.log(`All ${imageCount} images are visible.`);
}
