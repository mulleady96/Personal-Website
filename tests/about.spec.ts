import { test, expect } from "@playwright/test";

test("About", async ({ page }) => {
  await page.goto("http://localhost:4200/about");
  await expect(page.locator("h1")).toContainText("About Me");
  await expect(page.locator("h3")).toContainText(
    "I'm Andrew Mulleady and I'm a front-end developer based in Ireland."
  );
  await expect(page.locator("mat-list")).toContainText(
    "keyboard_arrow_rightAttended National University of Ireland, Galway"
  );
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Follow me on Github" }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Follow me on LinkedIn" }).click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Github button" }).click();
  const page3 = await page3Promise;
  await page.getByText("Portfolio", { exact: true }).click();
  await page.getByRole("tab", { name: "Career" }).click();
});
