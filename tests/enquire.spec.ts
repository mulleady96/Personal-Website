import { test, expect } from "@playwright/test";

test("Enquire", async ({ page }) => {
  await page.goto("http://localhost:4200/enquire");

  await page
    .locator("div")
    .filter({ hasText: /^First Name \*$/ })
    .nth(2)
    .click();
  await page.getByLabel("First Name *").fill("Andrew");
  await page.getByLabel("First Name *").press("Tab");
  await page.getByLabel("Last Name *").fill("Mulleady");
  await page.getByLabel("Last Name *").press("Tab");
  await page.getByLabel("Email", { exact: true }).fill("andrewmull@live.ie");
  await page.getByLabel("Email", { exact: true }).press("Tab");
  await page.getByLabel("Phone No. *").fill("11111111");
  await page.getByLabel("Phone No. *").press("Tab");
  await page.getByLabel("Company Name *").fill("co name");
  await page.getByText("New Website").click();
  await page.getByLabel("Tell us which brands,").click();
  await page.getByLabel("Tell us which brands,").fill("Nice text");
  // await page.getByRole("button", { name: "Submit" }).click();
  // await page.getByText("Form Successfully Submitted,").click();
});
