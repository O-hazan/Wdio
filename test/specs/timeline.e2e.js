const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

const userName = "qa-prod1@gymondo.de";
const password = "purpleSquid22!";

describe("timeline workout days match calendar workout days", () => {
  it("login and start a program", async () => {
    await loginPage.login(userName, password);
    await planPage.startProgram();
  });

  it("open timeline and compare workout days to ones in the calendar", async () => {
    await browser.pause(1000);
    const calendarDaysText = await planPage.getSelectedCalendarDays();
    await console.log("calendarDaysText", calendarDaysText);
    // Open timline modal
    await planPage.btnTimeline.waitForDisplayed();
    await planPage.btnTimeline.click();
    // Get timeline days text
    await planPage.timelineToday.waitForDisplayed();
    let timelineDaysText = [];
    for (let i = 1; i < planPage.timelineDays.length; i++) {
      await timelineDaysText.push(await planPage.timelineDays[i].getText());
    }
    // Compare calendar days to timeline days
    await expect(await planPage.timelineDays[0].getText()).toEqual("Today");
    let j = 0;
    for (let i = 0; i < timelineDaysText.length; i++) {
      await expect(await timelineDaysText[i]).toContain(calendarDaysText[j]);
      j++;
      if (j === calendarDaysText.length) {
        j = 0;
      }
    }
    await expect(await $("div[class*=modal_closeWrapper]")).toBeExisting();
    // Close timeline modal
    await planPage.btnCloseTimeline.click();
  });

  it("Remove the program", async () => {
    await planPage.removeProgram();
  });
});
