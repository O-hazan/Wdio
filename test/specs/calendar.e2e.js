const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("calendar is back to default view when there is not ongoing program", () => {
  it("Login and verify there is no ongoing program", async () => {
    // Login
    await loginPage.login("qa-prod1@gymondo.de", "purpleSquid22!");
    // Start program
    await planPage.startProgram();
    //  Select a different day in the calendar
    await $(`div[class*="calendar_wrapper"]`)
      .$$(`div[class*="calendar_dayWrapper"]`)[2]
      .click();
    //   Remove the program
    await planPage.removeProgram();
    // Verify the today is selected in the calendar - Here there is a bug that makes the test fail (Omer - remove the [2])
    await expect(
      await $(`div[class*="calendar_wrapper"]`).$$(
        `div[class*="calendar_dateWrapper"]`
      )[2]
    ).toHaveElementClassContaining("calendar_active");
  });
});
