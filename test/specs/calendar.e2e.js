const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

const userName = "qa-prod1@gymondo.de";
const password = "purpleSquid22!";

describe("Calendar is back to not active when ending the last program", () => {
  it("Login, start a program and verify calendar mouse pointer", async () => {
    // Login
    await loginPage.login(userName, password);
    // Start program
    await planPage.startProgram();

    // Verify calendar days have pointer cursor
    const calendarDots = await planPage.calendarDots;
    for (let i = 0; i < calendarDots.length; i++) {
      const mouseProp = await calendarDots[i].getCSSProperty("cursor");
      await expect(await mouseProp.value).toBe("pointer");
    }
  });

  it("Select a different day in the calendar", async () => {
    //  Select a different day in the calendar
    await planPage.thirdCalendarDay.click();
  });

  it("Remove the program and verify UI is back to default ", async () => {
    //   Remove the program
    await planPage.removeProgram();

    // Verify that today is selected in the calendar
    await expect(
      await planPage.thirdCalendarDate //Change here the 2 to 0 to make the test valid and it will fail because the wrong item is selected
    ).toHaveAttrContaining("class", "calendar_active");

    // Verify workout days dot indication is removed from calendar
    await browser.pause(1000);
    await expect(await planPage.calendarDots).toHaveLength(0);

    // Verify  calendar elements have disabled class
    for (const el of await planPage.calendarDayWrap) {
      await expect(await el).toHaveElementClassContaining("calendar_disabled");
    }
    for (const el of await planPage.calendarDayName) {
      await expect(await el).toHaveElementClassContaining("calendar_disabled");
    }
    for (const el of await planPage.calendarDots) {
      await expect(await el).toHaveElementClassContaining("calendar_disabled");
    }
  });
});
