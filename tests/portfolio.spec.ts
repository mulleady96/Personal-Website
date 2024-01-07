import { test, expect } from "@playwright/test";

test("Portfolio", async ({ page }) => {
  await page.goto("http://localhost:4200/portfolio");

  await expect(page.locator("h1")).toContainText("Portfolio");
  await expect(page.locator("h4")).toContainText(
    "Collection of personal projects below"
  );
  await expect(page.locator("app-products")).toContainText("Enquire");
  await expect(page.getByRole("button", { name: "Enquire" })).toBeVisible();
  await expect(
    page
      .locator("mat-card")
      .filter({ hasText: "Pierre Gasly Game Fun game" })
      .getByRole("img")
  ).toBeVisible();
  await expect(page.locator("app-products")).toContainText("View App");
  const page1Promise = page.waitForEvent("popup");
  await page
    .locator("mat-card")
    .filter({ hasText: "Pierre Gasly Game Fun game" })
    .getByLabel("External link to example")
    .click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page
    .locator("mat-card")
    .filter({ hasText: "Loyalty Rewards Simple App to" })
    .getByLabel("External link to example")
    .click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent("popup");
  await page
    .locator("mat-card")
    .filter({ hasText: "DOBBLE Dobble is a fun card" })
    .getByLabel("External link to example")
    .click();
  const page3 = await page3Promise;
});
