import { expect, Locator } from "@playwright/test";

export class Assertions {
  /**
   * Asserts that the locator is visible on the page.
   * @param locator - The Playwright Locator to check.
   */
  static async isVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Asserts that the locator is hidden on the page.
   * @param locator - The Playwright Locator to check.
   */
  static async isHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Asserts that the text content of a locator matches the expected value.
   * @param locator - The Playwright Locator to check.
   * @param expectedText - The text or RegExp to match.
   */
  static async hasText(
    locator: Locator,
    expectedText: string | RegExp,
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Asserts that the locator has a specific attribute with a given value.
   * @param locator - The Playwright Locator to check.
   * @param attributeName - The attribute to check.
   * @param expectedValue - The expected value of the attribute.
   */
  static async hasAttribute(
    locator: Locator,
    attributeName: string,
    expectedValue: string,
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attributeName, expectedValue);
  }

  /**
   * Asserts that the locator's value matches the expected value.
   * @param locator - The Playwright Locator to check.
   * @param expectedValue - The expected value.
   */
  static async hasValue(
    locator: Locator,
    expectedValue: string,
  ): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Asserts that the number of elements matching the locator equals the expected count.
   * @param locator - The Playwright Locator to check.
   * @param expectedCount - The expected number of elements.
   */
  static async hasCount(
    locator: Locator,
    expectedCount: number,
  ): Promise<void> {
    await expect(locator).toHaveCount(expectedCount);
  }

  /**
   * Asserts that the locator contains a specific CSS class.
   * @param locator - The Playwright Locator to check.
   * @param className - The expected CSS class name.
   */
  static async hasClass(locator: Locator, className: string): Promise<void> {
    await expect(locator).toHaveClass(className);
  }

  /**
   * Asserts that the locator is enabled.
   * @param locator - The Playwright Locator to check.
   */
  static async isEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Asserts that the locator is disabled.
   * @param locator - The Playwright Locator to check.
   */
  static async isDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled();
  }

  /**
   * Asserts that the locator's bounding box has the specified dimensions.
   * @param locator - The Playwright Locator to check.
   * @param expectedWidth - The expected width in pixels.
   * @param expectedHeight - The expected height in pixels.
   */
  static async hasDimensions(
    locator: Locator,
    expectedWidth: number,
    expectedHeight: number,
  ): Promise<void> {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeCloseTo(expectedWidth, 1);
    expect(box!.height).toBeCloseTo(expectedHeight, 1);
  }
}
