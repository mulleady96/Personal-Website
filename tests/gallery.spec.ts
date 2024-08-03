import { test, expect } from "@playwright/test";

test("Gallery", async ({ page }) => {
  await page.goto("http://localhost:4200/gallery");

  await page.getByLabel("Search").click();
  await page.getByRole("option", { name: "Roundstone" }).click();
  await page.getByRole("img", { name: "Photo of Roundstone" }).nth(1).click();
  await page.getByRole("img", { name: "Photo of scenery" }).click();
  await expect(page.locator("h3")).toContainText(
    "Here you will find a selection of Images from all across Ireland and beyond."
  );
  await expect(page.getByLabel("Sort By Location")).toContainText(
    " All 33 Barna Pier 5 Inverin 16 Lough Inagh 5 Mweenish Beach 2 Roundstone 5"
  );
  await expect(
    page.getByRole("img", { name: "Photo of Roundstone" }).nth(1)
  ).toBeVisible();
  await expect(page.locator("mat-list")).toContainText("Roundstone");
  await expect(page.getByLabel("Search")).toBeVisible();
  await page.getByLabel("Search").click();
  await expect(
    page.getByRole("tab", { name: "Viewing 5 images from" })
  ).toBeVisible();
});
