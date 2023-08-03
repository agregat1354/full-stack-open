describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser({
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get('input[name="Username"').should("be.visible");
    cy.get('input[name="Password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });
});
