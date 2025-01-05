/**
 * Generic locators using the playwright approved methods.
 */

import { Locator, Page } from "@playwright/test";

export class PageLocators {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locate by explicit and implicit accessibility attributes
  getByRole(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    role: any,
    options?: { name?: string | RegExp; level?: number },
  ): Locator {
    return this.page.getByRole(role, options);
  }

  // Locate by text content
  getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }

  // Locate a form control by associated label's text
  getByLabel(label: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(label, options);
  }

  // Locate an input by placeholder
  getByPlaceholder(
    placeholder: string | RegExp,
    options?: { exact?: boolean },
  ): Locator {
    return this.page.getByPlaceholder(placeholder, options);
  }

  // Locate an element (usually image) by its text alternative
  getByAltText(
    altText: string | RegExp,
    options?: { exact?: boolean },
  ): Locator {
    return this.page.getByAltText(altText, options);
  }

  // Locate an element by its title attribute
  getByTitle(title: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByTitle(title, options);
  }

  // Locate an element based on its data-testid attribute
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  // Example of custom reusable methods
  getSubmitButton(): Locator {
    return this.getByRole("button", { name: /submit/i });
  }

  getDynamicButton(buttonName: string): Locator {
    return this.getByRole("button", { name: new RegExp(buttonName, "i") });
  }

  // Combined locators (nested elements)
  getNestedElement(parentLocator: Locator, childSelector: string): Locator {
    return parentLocator.locator(childSelector);
  }
}
