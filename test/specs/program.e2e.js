const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

const browserTitle = "Gymondo Online Fitness - Get Fit & Happy at Home";
const userName = "qa-prod1@gymondo.de";
const password = "purpleSquid22!";
const welcomeText = "Select a program and start planning your workout routine.";
const SelectedNavColor = "#ff7f66";
const h2Text = "Select a program and start planning your workout routine.";
const browserUrl = "gymondo.com/train/timeline";

describe("Adding first plan and verifying content", () => {
  it("Login and verify user is on My plan tab", async () => {
    // Logs the user in
    await loginPage.login(userName, password);

    // Verify window title
    await expect(browser).toHaveTitle(browserTitle);
    await expect(browser).toHaveUrlContaining(browserUrl);

    //  Verify nav link attribute
    await expect(await planPage.planNav).toHaveAttribute(
      "aria-current",
      "page"
    );
    // Verify nav link color
    const colorobj = await planPage.planNav.getCSSProperty("color");
    let planNavColor = colorobj.parsed.hex;
    await expect(planNavColor).toBe(SelectedNavColor);

    // Verify header title is displayed
    await expect(await planPage.h1.getText()).toContain(", Tester!");
    await expect(await planPage.h1).toBeDisplayed();
  });

  it("Start a new program", async () => {
    //  Start a program
    await planPage.startProgram();

  });

  it("Remove the added program", async () => {
    //  Clean after the test
    await planPage.removeProgram();
    await browser.pause(1000);
    // Verify welcome text appear again
    await expect(await $(".page-wrapper h2").getText()).toEqual(welcomeText);
    await expect(await planPage.h2.getText()).toBe(h2Text);
  });
});
