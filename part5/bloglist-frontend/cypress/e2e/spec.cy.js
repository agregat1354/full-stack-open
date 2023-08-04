describe("Blog app", function () {
  beforeEach(function () {
    cy.log(Cypress.env());
    cy.request("POST", `${Cypress.env(`BACKEND`)}/testing/reset`);
    cy.createUser({
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    });
    cy.createUser({
      username: "grzegorzbrz",
      name: "Grzegorz Brzózka",
      password: "tajne1354",
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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get('input[name="Title"]').type("Test blog title");
      cy.get('input[name="Author"]').type("Test blogs author");
      cy.get('input[name="Url"]').type("https://blogs.com/test");
      cy.contains("add blog").click();

      cy.get(".info");

      cy.contains("Test blog title Test blogs author")
        .find("button")
        .should("have.text", "view");
    });

    describe("when example blog is created", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get('input[name="Title"]').type("Test blog title");
        cy.get('input[name="Author"]').type("Test blogs author");
        cy.get('input[name="Url"]').type("https://blogs.com/test");
        cy.contains("add blog").click();
      });

      it("user who eneterd the blog can give like to it", function () {
        cy.contains("Test blog title Test blogs author")
          .find("button")
          .should("have.text", "view")
          .click();

        cy.contains("likes 0");
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("blogs owner can remove blog", function () {
        cy.contains("Test blog title Test blogs author")
          .find("button")
          .should("have.text", "view")
          .click();

        cy.contains("remove").click();

        cy.contains("Test blog title Test blogs author").should("not.exist");
      });

      it.only("users can remove only blogs that they entered", function () {
        cy.login({ username: "grzegorzbrz", password: "tajne1354" });
        cy.contains("Test blog title Test blogs author")
          .find("button")
          .should("have.text", "view")
          .click();

        cy.contains("remove").should("not.be.visible");
      });
    });
  });
});
