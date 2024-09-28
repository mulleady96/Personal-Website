import { test, expect } from "@playwright/test";

test("Gallery", async ({ page }) => {
  await page.goto("http://localhost:4200/gallery");

  await page.getByLabel("Search").click();
  await page.getByLabel("Sort By Location").getByText("Barna Pier").click();
  await page.getByLabel("icon-button with menu options").first().click();
  await page.getByLabel("View more on Pexels").press("Escape");
  await page.getByLabel("Search").click();
  await page.getByLabel("Search").click();
  await expect(page.getByText("All 33 Barna Pier 5 Inverin")).toBeVisible();
  await page.getByText("All", { exact: true }).click();
  await page.getByLabel("Sort By Location").getByText("Lough Inagh").click();
  await expect(page.locator("h3")).toContainText(
    "Here you will find a selection of Images from all across Ireland and beyond."
  );
  await expect(page.locator("h1")).toContainText("Gallery");
});
