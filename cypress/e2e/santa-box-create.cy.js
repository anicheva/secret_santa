const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const manageBoxex = require("../fixtures/pages/manageBox.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let boxIdentifier;
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it.only("autor logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    // cy.get('.home-page-buttons > [href="/box/new"] > .btn-main').click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(boxPage.identifier)
      .click()
      .invoke("val")
      .then((text) => {
        boxIdentifier = text;
      });
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).click();
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(boxPage.tabsMenu)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("create the link for new participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.participantsApproval(users.user1.email, users.user1.password);
    // cy.visit(inviteLink);
    // cy.get(generalElements.submitButton).click();
    // cy.contains("войдите").click();
    // cy.login(users.user1.email, users.user1.password);
    // cy.contains("Создать карточку участника").should("exist");
    // cy.get(generalElements.submitButton).click();
    // cy.get(generalElements.arrowRight).click();
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeBoxPage.wishesInput).type(wishes);
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeDashboardPage.noticeForInvitee)
    //   .invoke("text")
    //   .then((text) => {
    //     expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    //   });
    // cy.clearCookies();
  });

  it("approve as user2", () => {
    cy.participantsApproval(users.user2.email, users.user2.password);

    // cy.visit(inviteLink);
    // cy.get(generalElements.submitButton).click();
    // cy.contains("войдите").click();
    // cy.login(users.user2.email, users.user2.password);
    // cy.contains("Создать карточку участника").should("exist");
    // cy.get(generalElements.submitButton).click();
    // cy.get(generalElements.arrowRight).click();
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeBoxPage.wishesInput).type(wishes);
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeDashboardPage.noticeForInvitee)
    //   .invoke("text")
    //   .then((text) => {
    //     expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    //   });
    // cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.participantsApproval(users.user3.email, users.user3.password);
  });

  it("autor logins and start the procedure", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
  });

  after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(manageBoxex.boxex).click();
    cy.get(manageBoxex.boxInMyBoxes).first().click();
    cy.get(manageBoxex.settingsOfTheBox).click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(manageBoxex.fieldForDeleting).type("Удалить коробку");
    cy.get(manageBoxex.deleteButton).click();
  });
});
