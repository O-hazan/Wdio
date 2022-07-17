const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("My plan page", () => {
  const userName = "qa-prod1@gymondo.de";
  const password = "purpleSquid22!";
  const myPlanUrl = "https://www.gymondo.com/train/timeline";

  before(async function () {
    await loginPage.login(userName, password);
  });

  beforeEach(async function () {
    await browser.url(myPlanUrl);
    await browser.pause(1000);
    await planPage.startProgram();
  });

  afterEach(async function () {
    await browser.url(myPlanUrl);
    await browser.pause(1000);
    await planPage.removeProgram();
  });

  it("Timeline workout days should match calendar workout days", async () => {
    await browser.pause(1000);
    const calendarDaysText = await planPage.getSelectedCalendarDays();
    // Open timline modal
    await planPage.btnTimeline.waitForDisplayed();
    await planPage.btnTimeline.click();
    // Get timeline days text
    await planPage.timelineToday.waitForDisplayed();
    let timelineDaysText = [];
    let j = 0;
    for (let i = 1; i < (await planPage.timelineDays.length); i++) {
      await timelineDaysText.push(await planPage.timelineDays[i].getText());
    }
    // Compare timeline and calendar days
    let misMatchDays = 0;
    for (let i = 0; i < timelineDaysText.length; i++) {
      if (timelineDaysText[i].substring(0, 2) !== calendarDaysText[j]) {
        misMatchDays++;
      }
      j++;
      if (j === calendarDaysText.length) {
        j = 0;
      }
    }
    // Verify all days match
    await expect(misMatchDays).toEqual(0);
    //  Verify first day in timeline is today
    await expect(await planPage.timelineDays[0].getText()).toEqual("Today");
  });

  it("Calendar workout days dots are removed when ending the last prograrm", async () => {
    await planPage.removeProgram();
    await browser.pause(1000);
    await expect(await planPage.calendarDots).toHaveLength(0);
  });

  it("Today is selected in calendar after ending the last prograrm", async () => {
    await planPage.thirdCalendarDay.click();
    await planPage.removeProgram();
    await browser.pause(1000);
    const todayDayTextColor = await planPage.thirdCalendarDay //Change here from: 'planPage.thirdCalendarDay' to 'planPage.todayCalendarDate' to make the test valid and it will fail because a wrong item is selected
      .$(`div[class*="calendar_dayName"]`)
      .getCSSProperty("color");
    const todayDateTextColor = await planPage.thirdCalendarDay //Change here from: 'planPage.thirdCalendarDay' to 'planPage.todayCalendarDate' to make the test valid and it will fail because a wrong item is selected
      .$(`div[class*="calendar_date"]`)
      .getCSSProperty("color");
    await expect(
      await planPage.thirdCalendarDate //Change here from: 'planPage.thirdCalendarDay' to 'planPage.todayCalendarDate' to make the test valid and it will fail because a wrong item is selected
    ).toHaveAttrContaining("class", "calendar_active");
    await expect(todayDayTextColor.parsed.hex).toEqual("#ffffff");
    await expect(todayDateTextColor.parsed.hex).toEqual("#ffffff");
  });
});
