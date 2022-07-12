const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("timeline workout days match calendar workout days", () => {
  it("login and start a program", async () => {
    await loginPage.login("qa-prod1@gymondo.de", "purpleSquid22!");
    await planPage.startProgram();
  });

  it("open timeline and compare workout days to ones in the calendar", async () => {
    const calendarDaysText = await planPage.getSelectedCalendarDays();

    // Open timline modal
    await $("button[class*=timeline]").waitForDisplayed();
    await $("button[class*=timeline]").click();

    // Get timeline days text
    await $("div[class*=timeline-modal_wrapper]")
      .$("div[class*=timeline-modal_dayTitle]")
      .waitForDisplayed();
    const timelineDays = await $("div[class*=timeline-modal_wrapper]").$$(
      "div[class*=timeline-modal_dayTitle]"
    );
    let timelineDaysText = [];
    for (let i = 1; i < timelineDays.length; i++) {
      await timelineDaysText.push(await timelineDays[i].getText());
    }

    // Compare calendar days to timeline days
    await expect(await timelineDays[0].getText()).toEqual("Today");
    let j = 0;
    for (let i = 0; i < timelineDaysText.length; i++) {
      await expect(await timelineDaysText[i]).toContain(calendarDaysText[j]);
      j++;
      if (j === calendarDaysText.length) {
        j = 0;
      }
    }
    await expect(await $("div[class*=modal_closeWrapper]")).toBeExisting();
    await $("div[class*=modal_closeWrapper]").click();
  });
  it("Removes the program", () => {
    planPage.removeProgram();
  });
});
