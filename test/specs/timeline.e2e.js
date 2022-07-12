const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("timeline workout days match calendar workout days", () => {
  it("login and start a program", async () => {
    await loginPage.login("qa-prod1@gymondo.de", "purpleSquid22!");
    await planPage.startProgram();
  });

  it("open timeline and compare workout days to ones in the calendar", async () => {
    // Collect days that have a dot in the calendar
    const calendarDays = await $("div[class*=calendar_wrapper]").$$(
      "div[class*=calendar_dot_]"
    );
    let addToday = false;
    let calendarDaysText = [];
    for (let i = 0; i < calendarDays.length; i++) {
      if (calendarDays[i] == "Today") {
        addToday = true;
      } else {
        await calendarDaysText.push(
          await calendarDays[i]
            .parentElement()
            .parentElement()
            .$("div[class*=calendar_dayName]")
            .getText()
        );
      }
    }

    // Get today weekday and check if it has a program
    if (addToday === true) {
      const today = new Date();
      let dd = await today.getDay();
      await console.log(dd);
      const daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      dd = daysArr[dd];
      await calendarDaysText.push(dd);
    }

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
  });
});
