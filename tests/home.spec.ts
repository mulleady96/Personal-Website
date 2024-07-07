import { test, expect } from "@playwright/test";

test("Home", async ({ page }) => {
  await page.goto("http://localhost:4200/home");
  await page.getByRole("heading", { name: "How Can We Help You!" }).click();
  await expect(page.locator("app-home")).toContainText("How Can We Help You!");
  await expect(page.getByLabel("Get Started")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "View Portfolio" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Front End Developer" }).nth(1)
  ).toBeVisible();
  await expect(page.locator("app-home")).toContainText("desktop_mac");
  await page.getByLabel("List").click();
  await page.locator("mat-sidenav").click();
  await page.locator(".mat-drawer-backdrop").click();
});
