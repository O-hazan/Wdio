const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("Adding first plan and verifying content", () => {
  it("Should login and verify user is on My plan tab", async () => {
    loginPage.login("qa-prod1@gymondo.de", "purpleSquid22!");
    expect(browser).toHaveTitle(
      "Gymondo Online Fitness - Get Fit & Happy at Home"
    );
    const myPlanNav = await $(".top-nav__list").$("a=My plan");
    await expect(await $(".top-nav__list").$("a=My plan")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(await $(".page-wrapper h1").getText()).toContain(", Tester!");
    expect(await $(".page-wrapper h2").isDisplayed()).toEqual(true);
  });

  it("Should start a new program", async () => {
    planPage.startProgram();
    expect(await $(".page-wrapper h1").getText()).toContain(", Tester!");
    await expect(await $("div=Plan settings")).toExist();
  });

  it("Should remove the added program", async () => {
    planPage.removeProgram();
    await browser.pause(1000);
    expect(await $(".page-wrapper h2").getText()).toEqual(
      "Select a program and start planning your workout routine."
    );
  });
});

// Bug found - Removing all plans and navigating back - endless lading.
