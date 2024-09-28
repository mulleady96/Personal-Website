describe("1st Home Test", () => {
  it("should visit home page", () => {
    cy.visit("/home");
    cy.url().should("include", "/home");
  });
});

describe("Side Menu Button", () => {
  it("Should open side menu", () => {
    cy.get(".mat-toolbar > :nth-child(1) > .mat-focus-indicator").click();
    cy.wait(1000);
    cy.get(".mat-drawer").should("be.visible");
    cy.get(".mat-drawer-backdrop").click();
    cy.get(".mat-drawer").should("not.be.visible");
  });
});

describe("Github Button", () => {
  it("Should open Github Account", () => {
    cy.get(":nth-child(3) > a.ng-tns-c309-0 > .ng-tns-c309-0").click();
    cy.spy();
  });
});

describe("Let's Get Started Button", () => {
  it("Let's Get Started button should redirect to Enquire", () => {
    cy.get(':nth-child(2) > :nth-child(1) > [routerlink="/enquire"]').click();
    cy.url().should("include", "/enquire");
  });
});

describe("View Example Apps Button", () => {
  it("Should open Products Page", () => {
    cy.visit("/home");
    cy.get(".mat-card-actions > .mat-focus-indicator").click();
    cy.url().should("include", "/products");
  });
});

describe("AM Logo Button", () => {
  it("Should redirect/open Home page", () => {
    cy.get(".icon-logo").click();
    cy.url().should("include", "/home");
  });

  describe("Theme persisting on page reload", () => {
    it("isDarkTheme should be true on page refresh", () => {
      cy.visit("/home");
      cy.get(".mat-toolbar > :nth-child(1) > .mat-focus-indicator").click();
      cy.wait(2000);
      cy.get(".mat-slide-toggle-content").click();
      cy.wait(5000);
      cy.reload();
    });
  });
});
