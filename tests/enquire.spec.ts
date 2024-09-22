// import { test, expect } from "@playwright/test";

// test("Enquire", async ({ page }) => {
//   await page.getByRole("tab", { name: "Fill out your name" });
//   await page
//     .locator("div")
//     .filter({ hasText: /^Name$/ })
//     .nth(2)
//     .click();
//   await page.getByLabel("Name", { exact: true }).fill("Andrew");
//   await page.getByRole("button", { name: "Next" }).click();
//   await page.getByRole("tab", { name: "Fill out your e-mail" }).click();
//   await page.getByLabel("Email", { exact: true }).click();
//   await page.getByLabel("Email", { exact: true }).fill("ok@live.ie");
//   await page.getByRole("button", { name: "Next" }).click();
//   await page.getByText("Name: Andrew").click();
//   await page.getByText("e-mail: ok@live.ie").click();
//   await expect(page.getByText("Name: Andrew")).toBeVisible();
//   await expect(page.getByText("e-mail: ok@live.ie")).toBeVisible();
//   await page.getByRole("button", { name: "Reset" }).click();
// });
