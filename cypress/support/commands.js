const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("participantsApproval", (userName, password) => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click();
  cy.login(userName, password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});
