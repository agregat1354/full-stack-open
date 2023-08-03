describe("Blog app", function () {
  beforeEach(function () {
    //cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.log(Cypress.env());
    cy.request("POST", `${Cypress.env(`BACKEND`)}/testing/reset`);
    cy.createUser({
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    });
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.get('input[name="Username"').should("be.visible");
    cy.get('input[name="Password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('input[name="Username"]').type("mluukkai");
      cy.get('input[name="Password"]').type("salainen");
      cy.get('button[type="submit"]').click();

      cy.contains("Succesfully logged in");
      cy.contains("mluukkai is logged in");
      cy.get(".info").should("have.css", "color", "rgb(0, 128, 0)");
    });

    it("fails with wrong credentials", function () {
      cy.get('input[name="Username"]').type("wrongUsername");
      cy.get('input[name="Password"]').type("wrongPassword");
      cy.get('button[type="submit"]').click();

      cy.contains("invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
