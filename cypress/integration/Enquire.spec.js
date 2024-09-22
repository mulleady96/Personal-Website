describe("1st Enquire Test", () => {
  it("should visit home page", () => {
    cy.visit("/enquire");
    cy.url().should("include", "/enquire");
  });
});

describe("Submit Form Test", () => {
  it("should Fill up form and click Submit Button", () => {
    // Fill up form with data
    cy.get("#firstName").type("Andrew");
    cy.get("#lastName").type("Mulleady");
    cy.get("#email").type("");
    cy.get("#phoneNo").type();
    cy.get("#companyName").type("Company Name");
    cy.get("#address").type("");
    cy.get(
      "#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-label"
    ).click();
    cy.get(
      "#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-label"
    ).click();
    cy.get("#description").type(
      "Hey, I am interested in getting a website made for my sports shop."
    );

    // Submit button Click
    cy.get("form.ng-tns-c312-2 > .mat-raised-button").click();
  });
});
